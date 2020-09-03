import {Component, OnInit} from '@angular/core';
import {Classes} from '../../interface/classes';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ClassesService} from '../../service/classes/classes.service';
import {NotificationService} from '../../service/notification/notification.service';
import {LectureService} from '../../service/lecture/lecture.service';
import {Lecture} from '../../interface/lecture';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  classes: Classes = {};
  listLecture: Lecture[] = [];
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private classesService: ClassesService,
              private lectureService: LectureService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.classes = await this.getClasses(this.id);
      if (this.classes.lecture == null) {
        this.classes.lecture = {
          id: -1
        };
      }
    });
    this.getAllLecture();
  }

  getClasses(id: number) {
    return this.classesService.getClasses(id).toPromise();
  }

  updateClasses(id: number) {
    this.classesService.updateClasses(id, this.classes).subscribe(() => {
      this.notificationService.showSuccessMessage('Cập nhật thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Cập nhật thất bại!');
    });
  }

  getAllLecture() {
    this.lectureService.getAllLecture().subscribe(listLecture => {
      this.listLecture = listLecture;
    });
  }
}
