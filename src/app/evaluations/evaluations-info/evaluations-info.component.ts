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

@Component({
  selector: 'app-evaluations-info',
  templateUrl: './evaluations-info.component.html',
  styleUrls: ['./evaluations-info.component.css']
})
export class EvaluationsInfoComponent implements OnInit {
  evaluationDetail: EvaluationsDetail = {
    evaluation: ''
  };
  id: number;
  listOutcome: Outcome[];
  evaluation: Evaluations;
  listEvaluation: string[] = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt', 'N/A'];
  evaluationChoice = null;
  evaluationCategoryChoice: string[] = [''];
  evaluationOutcomeChoice: string[] = [''];

  constructor(private activatedRoute: ActivatedRoute,
              private evaluationDetailService: EvaluationsDetailService,
              private skillService: SkillService,
              private categoryService: CategoryService,
              private outcomeService: OutcomeService,
              private evaluationService: EvaluationsService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getEvaluation(this.id);
    });
  }

  ngOnInit() {
    this.getAllOutcome();
  }

  getEvaluation(id) {
    this.evaluationService.getEvaluations(id).subscribe(evaluation => {
      this.evaluation = evaluation;
    });
  }

  getAllOutcome() {
    this.outcomeService.getAllOutcome().subscribe(listOutcome => {
      this.listOutcome = listOutcome;
      this.listOutcome.map(async outcome => {
        outcome.categories = await this.getAllCategoryByOutcome(outcome.id);
        outcome.categories.map(async category => {
          category.skills = await this.getAllSkillByCategory(category.id);
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

  createMultiEvaluationDetail() {

  }

  setAllEvaluation() {

  }

  setAllEvaluationByOutcome(id: any, index: number) {

  }

  setAllEvaluationByCategory(id: number, index: number) {

  }

  addEvaluationDetailToList(index: number) {

  }
}
