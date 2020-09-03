import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StudentService} from '../../service/student/student.service';
import {Student} from '../../interface/student';
import {UserToken} from '../../interface/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Classes} from '../../interface/classes';
import {ClassesService} from '../../service/classes/classes.service';

declare var $: any;

@Component({
  selector: 'app-classes-info',
  templateUrl: './classes-info.component.html',
  styleUrls: ['./classes-info.component.css']
})
export class ClassesInfoComponent implements OnInit {
  id: number;
  listStudents: Student[] = [];
  currentUser: UserToken;
  hasRoleAdmin = false;
  classes: Classes = {};

  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private studentService: StudentService,
              private classesService: ClassesService) {
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
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getClasses(this.id);
      this.getAllStudentByClasses(this.id);
    });
  }

  getStudentId(id: number) {
    this.id = id;
  }

  getClasses(id) {
    this.classesService.getClasses(id).subscribe(classes => {
      this.classes = classes;
    });
  }

  getAllStudentByClasses(id: number) {
    this.studentService.getAllStudentByClasses(id).subscribe(listStudent => {
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
