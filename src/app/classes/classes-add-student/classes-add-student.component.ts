import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student/student.service';
import {NotificationService} from '../../service/notification/notification.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Student} from '../../interface/student';
import {Classes} from '../../interface/classes';

@Component({
  selector: 'app-classes-add-student',
  templateUrl: './classes-add-student.component.html',
  styleUrls: ['./classes-add-student.component.css']
})
export class ClassesAddStudentComponent implements OnInit {
  data: string = '';
  id: number;
  classes: Classes = {};

  constructor(private studentService: StudentService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  createMultiStudent() {
    let students = this.data.split('\n');
    let studentValues = [];
    students.map(student => {
      let row = student.split('\t');
      if (row.length >= 3) {
        studentValues.push(row);
      }
    });
    let result = studentValues.reduce((createMultiPromise, student) => {
      return createMultiPromise.then(async () => {
        return await this.createStudent(student);
      });
    }, Promise.resolve());
    result.then(() => {
      this.notificationService.showSuccessMessage('Tạo thành công!');
      this.data = '';
    }).catch(() => {
      this.notificationService.showErrorMessage('Tạo thất bại!');
    });
  }

  createStudent(students) {
    const student: Student = {
      studentId: students[1],
      name: students[2],
      classes: {
        id: this.id
      }
    };
    return this.studentService.createStudent(student).toPromise();
  }
}
