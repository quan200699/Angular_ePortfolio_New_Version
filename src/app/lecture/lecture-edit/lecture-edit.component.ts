import {Component, OnInit} from '@angular/core';
import {Lecture} from '../../interface/lecture';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {LectureService} from '../../service/lecture/lecture.service';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-lecture-edit',
  templateUrl: './lecture-edit.component.html',
  styleUrls: ['./lecture-edit.component.css']
})
export class LectureEditComponent implements OnInit {
  lecture: Lecture = {
    name: '',
    email: '',
    lectureId: ''
  };
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private lectureService: LectureService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.lecture = await this.getLecture(this.id);
    });
  }

  getLecture(id: number) {
    return this.lectureService.getLecture(id).toPromise();
  }

  updateLecture(id: number) {
    this.lectureService.updateLecture(id, this.lecture).subscribe(() => {
      this.notificationService.showSuccessMessage("Cập nhật thành công!")
    }, () => {
      this.notificationService.showErrorMessage("Cập nhật thất bại!")
    });
  }
}
