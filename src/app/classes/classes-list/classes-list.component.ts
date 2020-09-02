import {Component, OnInit} from '@angular/core';
import {Classes} from '../../interface/classes';
import {UserToken} from '../../interface/user-token';
import {ClassesService} from '../../service/classes/classes.service';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {
  listClasses: Classes[];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;

  constructor(private classesService: ClassesService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_ADMIN') {
          this.hasRoleAdmin = true;
        }
      }
    }
  }

  ngOnInit() {
    this.getAllClasses();
  }

  getClassesId(id: number) {
    this.id = id;
  }

  deleteClasses() {
    this.classesService.deleteClasses(this.id).subscribe(() => {
      this.classesService.getAllClasses().subscribe(listClasses => {
        this.listClasses = listClasses;
      });
      $(function() {
        $('#modal-delete').modal('hide');
      });
      this.notificationService.showSuccessMessage("Xóa thành công!")
    }, () => {
      this.notificationService.showErrorMessage("Xóa thất bại!")
    });
  }

  getAllClasses() {
    this.classesService.getAllClasses().subscribe(listClasses => {
      this.listClasses = listClasses;
      $(function() {
        $('#table-classes').DataTable({
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
