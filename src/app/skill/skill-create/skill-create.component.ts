import {Component, OnInit} from '@angular/core';
import {SkillService} from '../../service/skill/skill.service';
import {NotificationService} from '../../service/notification/notification.service';
import {CategoryService} from '../../service/category/category.service';
import {Skill} from '../../interface/skill';

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent implements OnInit {
  data: string = '';

  constructor(private skillService: SkillService,
              private notificationService: NotificationService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  createMultiSkill() {
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
        return await this.createSkill(skillRow);
      });
    }, Promise.resolve());
    result.then(() => {
      this.notificationService.showSuccessMessage('Tạo thành công!');
      this.data = '';
    }).catch(() => {
      this.notificationService.showErrorMessage('Tạo thất bại!');
    });
  }

  async createSkill(skillRow: string) {
    let listCategory = this.getCategoryName();
    let row = skillRow.split('\t');
    const skill: Skill = {
      skillId: row[0].trim(),
      name: row[1].trim()
    };
    let regex = /\.$/;
    for (let category of listCategory) {
      const categoryRow = category.split('\t');
      let isCorrect = regex.test(row[0].substring(0, 4));
      let skillId;
      if (row[0].length == 5 || isCorrect) {
        skillId = row[0].substring(0, 3);
      } else if (row[0].length == 6 && !isCorrect) {
        skillId = row[0].substring(0, 4);
      }
      if (skillId == categoryRow[0]) {
        skill.category = await this.getCategoryByName(categoryRow[1].trim());
        return await this.skillService.createSkill(skill).toPromise();
      }
    }
  }

  getCategoryByName(name) {
    return this.categoryService.findByCategoryName(name).toPromise();
  }

  getCategoryName(): string[] {
    let listCategory;
    let categoryName = [];
    let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
    let isCategory = /[1-9].[0-9]{1,2}/;
    listCategory = this.data.split('\n');
    for (let category of listCategory) {
      if (!isSkill.test(category)) {
        const row = category.trim().split('\t');
        if (row.length == 2 && isCategory.test(row)) {
          categoryName.push(category);
        }
      }
    }
    return categoryName;
  }
}
