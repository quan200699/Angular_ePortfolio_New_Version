import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../interface/user-token';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Outcome} from '../../interface/outcome';
import {OutcomeService} from '../../service/outcome/outcome.service';

declare var $: any;

@Component({
  selector: 'app-outcome-list',
  templateUrl: './outcome-list.component.html',
  styleUrls: ['./outcome-list.component.css']
})
export class OutcomeListComponent implements OnInit {

  listOutcome: Outcome[];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;

  constructor(private outcomeService: OutcomeService,
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
    this.getAllLecture();
  }

  getOutcomeId(id: number) {
    this.id = id;
  }

  deleteOutcome() {
    this.outcomeService.deleteOutcome(this.id).subscribe(() => {
      this.outcomeService.getAllOutcome().subscribe(listLecture => {
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

  getAllLecture() {
    this.outcomeService.getAllOutcome().subscribe(listOutcome => {
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
