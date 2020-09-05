import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {EvaluationsDetailService} from '../../service/evaluations-detail/evaluations-detail.service';
import {SkillService} from '../../service/skill/skill.service';
import {CategoryService} from '../../service/category/category.service';
import {EvaluationsDetail} from '../../interface/evaluations-detail';
import {Outcome} from '../../interface/outcome';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {EvaluationsService} from '../../service/evaluations/evaluations.service';
import {Evaluations} from '../../interface/evaluations';
import {Skill} from '../../interface/skill';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-evaluations-info',
  templateUrl: './evaluations-info.component.html',
  styleUrls: ['./evaluations-info.component.css']
})
export class EvaluationsInfoComponent implements OnInit {
  evaluationDetail: EvaluationsDetail = {
    evaluation: null
  };
  id: number;
  listOutcome: Outcome[];
  evaluation: Evaluations;
  listEvaluation: string[] = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt', 'N/A'];
  evaluationChoice = null;
  evaluationCategoryChoice: string[] = [];
  evaluationOutcomeChoice: string[] = [];
  listEvaluationDetail: EvaluationsDetail[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private evaluationDetailService: EvaluationsDetailService,
              private skillService: SkillService,
              private categoryService: CategoryService,
              private outcomeService: OutcomeService,
              private evaluationService: EvaluationsService,
              private notificationService: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getEvaluation(this.id);
    });
  }

  ngOnInit() {
    this.getAllOutcome();
    this.getAllCategory();
    this.getAllSkill();
  }

  getEvaluation(id) {
    this.evaluationService.getEvaluations(id).subscribe(evaluation => {
      this.evaluation = evaluation;
      this.evaluation.createDate = new Date(this.evaluation.createDate);
    });
  }

  getAllOutcome() {
    this.outcomeService.getAllOutcome().subscribe(listOutcome => {
      this.listOutcome = listOutcome;
      for (let i = 0; i < listOutcome.length; i++) {
        this.evaluationOutcomeChoice[i] = null;
      }
      this.listOutcome.map(async outcome => {
        outcome.categories = await this.getAllCategoryByOutcome(outcome.id);
        outcome.categories.map(async category => {
          category.skills = await this.getAllSkillByCategory(category.id);
          category.skills.map(async skill => {
            skill.evaluations = await this.getEvaluationDetailByEvaluationAndSkill(this.id, skill.id);
          });
        });
      });
    });
  }

  getAllCategoryByOutcome(id: number) {
    return this.outcomeService.getAllCategoryByOutcome(id).toPromise();
  }

  getAllSkillByCategory(id: number) {
    return this.categoryService.getAllSkillByCategory(id).toPromise();
  }

  createMultiEvaluationDetail(listEvaluationDetail: EvaluationsDetail[]) {
    let result = listEvaluationDetail.reduce((createMultiPromise, evaluationDetail) => {
      return createMultiPromise.then(async () => {
        return await this.createEvaluationDetail(evaluationDetail);
      });
    }, Promise.resolve());
    result.then(() => {
      this.notificationService.showSuccessMessage('Đánh giá thành công!');
      this.clearAll();
    }).catch(() => {
      this.notificationService.showErrorMessage('Đánh giá thất bại!');
    });
  }

  setAllEvaluation() {
    this.skillService.getAllSkill().subscribe(listSkill => {
      for (let i = 0; i < listSkill.length; i++) {
        this.listEvaluationDetail[i] = {
          evaluations: {
            id: this.evaluation.id
          },
          skill: {
            id: listSkill[i].id
          },
          evaluation: this.evaluationChoice
        };
      }
    });
  }

  setAllEvaluationByOutcome(id: any, index: number) {
    this.outcomeService.getAllCategoryByOutcome(id).subscribe(categoryList => {
      for (let j = 0; j < categoryList.length; j++) {
        this.categoryService.getAllSkillByCategory(categoryList[j].id).subscribe(skillList => {
          for (let i = 0; i < skillList.length; i++) {
            for (let k = 0; k < this.listEvaluationDetail.length; k++) {
              if (skillList[i].id == this.listEvaluationDetail[k].skill.id) {
                this.listEvaluationDetail[k] = {
                  evaluations: {
                    id: this.evaluation.id
                  },
                  skill: {
                    id: skillList[i].id
                  },
                  evaluation: this.evaluationOutcomeChoice[index]
                };
              }
            }
          }
        });
      }
    });
  }

  setAllEvaluationByCategory(id: number, index: number) {
    this.categoryService.getAllSkillByCategory(id).subscribe(skillList => {
      for (let i = 0; i < skillList.length; i++) {
        if (skillList[i].id == this.listEvaluationDetail[i].skill.id) {
          this.listEvaluationDetail[i] = {
            evaluations: {
              id: this.evaluation.id
            },
            skill: {
              id: skillList[i].id
            },
            evaluation: this.evaluationCategoryChoice[index]
          };
        }
      }
    });
  }

  addEvaluationDetailToList(skill: Skill, index: number) {
    const evaluationDetail: EvaluationsDetail = {
      evaluations: {
        id: this.evaluation.id
      },
      skill: {
        id: skill.id
      },
      evaluation: this.evaluationDetail.evaluation
    };
    if (this.listEvaluationDetail.length == 0) {
      this.listEvaluationDetail.push(evaluationDetail);
    } else {
      this.listEvaluationDetail[index] = evaluationDetail;
    }
  }

  async createEvaluationDetail(evaluationDetail: EvaluationsDetail) {
    return await this.evaluationDetailService.createEvaluationsDetail(evaluationDetail).toPromise();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(listCategory => {
      for (let i = 0; i < listCategory.length; i++) {
        this.evaluationCategoryChoice[i] = null;
      }
    });
  }

  getAllSkill() {
    this.skillService.getAllSkill().subscribe(listSkill => {
      for (let i = 0; i < listSkill.length; i++) {
        let evaluationDetail: EvaluationsDetail = {
          skill: listSkill[i],
          evaluations: this.evaluation,
          evaluation: 'N/A'
        };
        this.listEvaluationDetail.push(evaluationDetail);
      }
    });
  }

  clearAll() {
    this.listEvaluationDetail = [];
    this.getEvaluation(this.id);
    this.evaluationChoice = null;
    this.evaluationCategoryChoice = [];
    this.evaluationOutcomeChoice = [];
    this.getAllOutcome();
  }

  getEvaluationDetailByEvaluationAndSkill(id: number, skillId: number) {
    return this.evaluationService.getAllEvaluationsDetailByEvaluationAndSkill(id, skillId).toPromise();
  }
}
