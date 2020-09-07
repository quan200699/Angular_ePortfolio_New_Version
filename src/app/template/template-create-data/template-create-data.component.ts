import {Component, OnInit} from '@angular/core';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Outcome} from '../../interface/outcome';
import {CategoryService} from '../../service/category/category.service';
import {SkillService} from '../../service/skill/skill.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Category} from '../../interface/category';
import {Skill} from '../../interface/skill';

@Component({
  selector: 'app-template-create-data',
  templateUrl: './template-create-data.component.html',
  styleUrls: ['./template-create-data.component.css']
})
export class TemplateCreateDataComponent implements OnInit {
  data: string = '';
  id: number;
  listOutcome: Outcome[] = [];
  listCategory: Category[] = [];

  constructor(private outcomeService: OutcomeService,
              private categoryService: CategoryService,
              private skillService: SkillService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit() {
  }

  createMultiOutcome(id) {
    let rows = this.data.split('\n');
    let outcomeTitles = [];
    for (let i = 0; i < rows.length; i++) {
      let columns = rows[i].split('\t');
      if (columns[0].toUpperCase().includes('PHẦN')) {
        outcomeTitles.push(columns[0]);
      }
    }
    let result = outcomeTitles.reduce((createMultiPromise, nextTitle) => {
      return createMultiPromise.then(async () => {
        let outcome = await this.createOutcome(nextTitle, id);
        this.listOutcome.push(outcome);
        return outcome;
      });
    }, Promise.resolve());
    result.then(() => {
      this.createMultiCategory(this.listOutcome);
    }).catch(() => {
    });
  }

  createOutcome(title, id) {
    let outcome: Outcome = {
      title: title,
      template: {
        id: id
      }
    };
    return this.outcomeService.createOutcome(outcome).toPromise();
  }

  createMultiCategory(listOutcome) {
    let isCategory = /[1-9].[0-9]{1,2}/;
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    let listCategory = this.data.split('\n');
    let categoryRows = [];
    for (let category of listCategory) {
      if (!isSkill.test(category)) {
        if (isCategory.test(category)) {
          categoryRows.push(category);
        }
      }
    }
    let result = categoryRows.reduce((createMultiPromise, categoryRow) => {
      return createMultiPromise.then(async () => {
        let category = await this.createCategory(categoryRow, listOutcome);
        this.listCategory.push(category);
        return category;
      });
    }, Promise.resolve());
    result.then(() => {
      this.createMultiSkill(this.listCategory);
    }).catch(() => {
    });
  }

  async createCategory(categoryRow: string, listOutcome) {
    let isInOutcomeFirst = /1.[0-9]{1,2}/;
    let isInOutcomeSecond = /2.[0-9]{1,2}/;
    let isInOutcomeThird = /3.[0-9]{1,2}/;
    let row = categoryRow.split('\t');
    const category: Category = {
      categoryId: row[0].trim(),
      name: row[1].trim()
    };
    if (isInOutcomeFirst.test(categoryRow)) {
      category.outcome = listOutcome[0];
      return this.categoryService.createCategory(category).toPromise();
    }
    if (isInOutcomeSecond.test(categoryRow)) {
      category.outcome = listOutcome[1];
      return this.categoryService.createCategory(category).toPromise();
    }
    if (isInOutcomeThird.test(categoryRow)) {
      category.outcome = listOutcome[2];
      return this.categoryService.createCategory(category).toPromise();
    }
  }

  createMultiSkill(listCategory: Category[]) {
    let data = this.data;
    let skillRows = [];
    let listSkill;
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    listSkill = data.split('\n');
    for (let skill of listSkill) {
      if (isSkill.test(skill)) {
        skillRows.push(skill);
      }
    }
    let result = skillRows.reduce((createMultiPromise, skillRow) => {
      return createMultiPromise.then(async () => {
        return await this.createSkill(skillRow, listCategory);
      });
    }, Promise.resolve());
    result.then(() => {
      this.notificationService.showSuccessMessage('Tạo thành công!');
      this.data = '';
    }).catch(() => {
      this.notificationService.showErrorMessage('Tạo thất bại!');
    });
  }

  async createSkill(skillRow: string, listCategory: Category[]) {
    let row = skillRow.split('\t');
    const skill: Skill = {
      skillId: row[0].trim(),
      name: row[1].trim()
    };
    let regex = /\.$/;
    for (let category of listCategory) {
      let isCorrect = regex.test(row[0].substring(0, 4));
      let skillId;
      if (row[0].length == 5 || isCorrect) {
        skillId = row[0].substring(0, 3);
      } else if (row[0].length == 6 && !isCorrect) {
        skillId = row[0].substring(0, 4);
      }
      if (skillId == category.categoryId) {
        skill.category = category;
        return await this.skillService.createSkill(skill).toPromise();
      }
    }
  }
}
