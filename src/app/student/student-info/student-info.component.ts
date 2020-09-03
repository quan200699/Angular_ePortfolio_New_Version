import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Student} from '../../interface/student';
import {StudentService} from '../../service/student/student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  student: Student = {};
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getStudent(this.id);
    });
  }

  ngOnInit() {
  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe(student => {
      this.student = student;
    });
  }
}
