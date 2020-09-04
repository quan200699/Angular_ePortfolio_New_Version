import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../interface/user-token';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Template} from '../../interface/template';
import {TemplateService} from '../../service/template/template.service';

declare var $: any;

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  listTemplate: Template[] = [];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;

  constructor(private templateService: TemplateService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ADMIN') {
          this.hasRoleAdmin = true;
        }
      }
    }
  }

  ngOnInit() {
    this.getAllTemplate();
  }

  getTemplateId(id: number) {
    this.id = id;
  }

  deleteTemplate() {
    this.templateService.deleteTemplate(this.id).subscribe(() => {
      this.templateService.getAllTemplate().subscribe(listTemplate => {
        this.listTemplate = listTemplate;
      });
      $(function() {
        $('#modal-delete').modal('hide');
      });
      this.notificationService.showSuccessMessage('Xóa thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Xóa thất bại!');
    });
  }

  getAllTemplate() {
    this.templateService.getAllTemplate().subscribe(listTemplate => {
      this.listTemplate = listTemplate;
      $(function() {
        $('#table-templates').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false,
        });
      });
    });
  }
}
