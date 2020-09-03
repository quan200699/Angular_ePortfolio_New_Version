import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../interface/user-token';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Student} from '../../interface/student';
import {StudentService} from '../../service/student/student.service';

declare var $: any;

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  listStudents: Student[] = [];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;

  constructor(private studentService: StudentService,
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
    this.getAllStudent();
  }

  getStudentId(id: number) {
    this.id = id;
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.id).subscribe(() => {
      this.studentService.getAllStudent().subscribe(listStudent => {
        this.listStudents = listStudent;
      });
      $(function() {
        $('#modal-delete').modal('hide');
      });
      this.notificationService.showSuccessMessage('Xóa thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Xóa thất bại!');
    });
  }

  getAllStudent() {
    this.studentService.getAllStudent().subscribe(listStudent => {
      this.listStudents = listStudent;
      $(function() {
        $('#table-students').DataTable({
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
