import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';
import {TemplateService} from '../../service/template/template.service';
import {Template} from '../../interface/template';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})
export class TemplateCreateComponent implements OnInit {

  template: Template = {
    name: ''
  };

  constructor(private templateService: TemplateService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  createTemplate() {
    this.templateService.createTemplate(this.template).subscribe(() => {
      this.notificationService.showSuccessMessage('Tạo thành công!');
      this.template = {};
    }, () => {
      this.notificationService.showErrorMessage('Tạo thất bại!');
    });
  }

}
