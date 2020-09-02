import {Component, OnInit} from '@angular/core';
import {Lecture} from '../../interface/lecture';
import {LectureService} from '../../service/lecture/lecture.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from '../../interface/user';
import {NotificationService} from '../../service/notification/notification.service';
import {UserService} from '../../service/user/user.service';

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

  constructor(private lectureService: LectureService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  async createLecture() {
    if (this.lecture.email != '') {
      let user = await this.register(this.lecture.email);
      if (user != null) {
        user = await this.getUserByEmail(user.email);
        if (user != null) {
          this.lecture.user = user;
          this.lectureService.createLecture(this.lecture).subscribe(() => {
            this.notificationService.showSuccessMessage('Tạo thành công!');
          }, () => {
            this.notificationService.showErrorMessage('Xảy ra lỗi!');
          });
        }
      }
    } else {
      this.notificationService.showErrorMessage('Chưa điền email!');
    }
  }

  register(email) {
    let user: User = {
      email: email,
      password: '123456@Abc'
    };
    return this.authenticationService.register(user).toPromise();
  }

  getUserByEmail(email) {
    return this.userService.getUserByEmail(email).toPromise();
  }

}
