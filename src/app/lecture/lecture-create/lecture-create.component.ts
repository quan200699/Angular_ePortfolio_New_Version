import {Component, OnInit} from '@angular/core';
import {Lecture} from '../../interface/lecture';

@Component({
  selector: 'app-lecture-create',
  templateUrl: './lecture-create.component.html',
  styleUrls: ['./lecture-create.component.css']
})
export class LectureCreateComponent implements OnInit {
  lecture: Lecture = {
    name: '',
    email: '',
    lectureId: ''
  };

  constructor() {
  }

  ngOnInit() {
  }

  createLecture() {

  }
}
