import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {CategoryService} from '../../service/category/category.service';
import {SkillService} from '../../service/skill/skill.service';
import {Outcome} from '../../interface/outcome';
import {UserToken} from '../../interface/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-template-info',
  templateUrl: './template-info.component.html',
  styleUrls: ['./template-info.component.css']
})
export class TemplateInfoComponent implements OnInit {
  listOutcome: Outcome[];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;
  templateId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private outcomeService: OutcomeService,
              private categoryService: CategoryService,
              private skillService: SkillService,
              private authenticationService: AuthenticationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.templateId = +paramMap.get('id');
      this.getAllOutcomeByTemplate(this.templateId);
    });
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
  }

  getOutcomeId(id: number) {
    this.id = id;
  }

  deleteOutcome(templateId) {
    this.outcomeService.deleteOutcome(this.id).subscribe(() => {
      this.outcomeService.getAllOutcomeByTemplate(templateId).subscribe(listLecture => {
        this.listOutcome = listLecture;
      });
      $(function() {
        $('#modal-delete').modal('hide');
      });
      this.notificationService.showSuccessMessage('Xóa thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Xóa thất bại!');
    });
  }

  getAllOutcomeByTemplate(id) {
    this.outcomeService.getAllOutcomeByTemplate(id).subscribe(listOutcome => {
      this.listOutcome = listOutcome;
      $(function() {
        $('#table-outcome').DataTable({
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
