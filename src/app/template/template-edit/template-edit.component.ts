import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {Template} from '../../interface/template';
import {TemplateService} from '../../service/template/template.service';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css']
})
export class TemplateEditComponent implements OnInit {
  template: Template = {
    name: ''
  };
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private templateService: TemplateService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.template = await this.getTemplate(this.id);
    });
  }

  getTemplate(id: number) {
    return this.templateService.getTemplate(id).toPromise();
  }

  updateTemplate(id: number) {
    this.templateService.updateTemplate(id, this.template).subscribe(() => {
      this.notificationService.showSuccessMessage("Cập nhật thành công!")
    }, () => {
      this.notificationService.showErrorMessage("Cập nhật thất bại!")
    });
  }

}
