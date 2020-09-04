import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {Category} from '../../interface/category';
import {Outcome} from '../../interface/outcome';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  data: string = '';

  constructor(private categoryService: CategoryService,
              private outcomeService: OutcomeService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  createMultiCategory() {
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
        return await this.createCategory(categoryRow);
      });
    }, Promise.resolve());
    result.then(() => {
      this.notificationService.showSuccessMessage('Tạo thành công!');
      this.data = '';
    }).catch(() => {
      this.notificationService.showErrorMessage('Tạo thất bại!');
    });
  }

  async createCategory(categoryRow: string) {
    let outcomeName = this.getOutcomeName();
    let isInOutcomeFirst = /1.[0-9]{1,2}/;
    let isInOutcomeSecond = /2.[0-9]{1,2}/;
    let isInOutcomeThird = /3.[0-9]{1,2}/;
    let row = categoryRow.split('\t');
    const category: Category = {
      categoryId: row[0].trim(),
      name: row[1].trim()
    };
    let outcome1 = await this.getOutcomeByName(outcomeName[0].trim());
    let outcome2 = await this.getOutcomeByName(outcomeName[1].trim());
    let outcome3 = await this.getOutcomeByName(outcomeName[2].trim());
    if (isInOutcomeFirst.test(categoryRow)) {
      category.outcome = outcome1;
      return this.categoryService.createCategory(category).toPromise();
    }
    if (isInOutcomeSecond.test(categoryRow)) {

      category.outcome = outcome2;
      return this.categoryService.createCategory(category).toPromise();
    }
    if (isInOutcomeThird.test(categoryRow)) {
      category.outcome = outcome3;
      return this.categoryService.createCategory(category).toPromise();
    }
  }

  getOutcomeByName(title) {
    return this.outcomeService.findByTitle(title).toPromise();
  }

  getOutcomeName(): string[] {
    let data = this.data;
    let listOutcome;
    let outcomeRow = [];
    let outcomeName = [];
    listOutcome = data.split('\n');
    for (let outcome of listOutcome) {
      const row = outcome.split('\t');
      if (outcome.includes('PHẦN ')) {
        outcomeRow = row;
        outcomeName.push(outcomeRow[0].trim());
      }
    }
    return outcomeName;
  }
}
