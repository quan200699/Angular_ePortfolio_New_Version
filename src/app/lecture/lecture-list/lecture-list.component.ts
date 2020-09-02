import {Component, OnInit} from '@angular/core';
import {Lecture} from '../../interface/lecture';
import {UserToken} from '../../interface/user-token';
import {LectureService} from '../../service/lecture/lecture.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.css']
})
export class LectureListComponent implements OnInit {

  listLecture: Lecture[];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;

  constructor(private lectureService: LectureService,
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

  getLectureId(id: number) {
    this.id = id;
  }

  deleteLecture() {
    this.lectureService.deleteLecture(this.id).subscribe(() => {
      this.lectureService.getAllLecture().subscribe(listLecture => {
        this.listLecture = listLecture;
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
    this.lectureService.getAllLecture().subscribe(listLecture => {
      this.listLecture = listLecture;
      $(function() {
        $('#table-lecture').DataTable({
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
