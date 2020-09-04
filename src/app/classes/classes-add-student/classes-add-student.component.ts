import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student/student.service';
import {NotificationService} from '../../service/notification/notification.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Student} from '../../interface/student';
import {Classes} from '../../interface/classes';
import {ClassesService} from '../../service/classes/classes.service';

@Component({
  selector: 'app-classes-add-student',
  templateUrl: './classes-add-student.component.html',
  styleUrls: ['./classes-add-student.component.css']
})
export class ClassesAddStudentComponent implements OnInit {
  data: string = '';
  id: number;

  constructor(private studentService: StudentService,
              private notificationService: NotificationService,
              private classesService: ClassesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  createMultiStudent() {
    let students = this.data.split('\n');
    let createMultiStudent = students.map(student => {
      let row = student.split('\t');
      if (row.length >= 3) {
        return this.createStudent(row);
      }
    });
    Promise.all(createMultiStudent).then(() => {
      this.notificationService.showSuccessMessage('Taọ mới thành công!');
    }).catch(() => {
      this.notificationService.showErrorMessage('Tạo mới thất bại!');
    });
  }

  async createStudent(students) {
    let student: Student = {
      studentId: students[1],
      name: students[2],
      classes: {
        id: this.id
      }
    };
    return this.studentService.createStudent(student).toPromise();
  }
}
