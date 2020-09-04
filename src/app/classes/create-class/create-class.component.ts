import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../../service/classes/classes.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Classes} from '../../interface/classes';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {
  data: string = '';

  constructor(private classesService: ClassesService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  createMultiClass() {
    let classNames = [];
    let rows = this.data.split('\n');
    for (let i = 0; i < rows.length; i++) {
      let columns = rows[i].split('\t');
      if (rows[i].length >= 3) {
        classNames.push(columns[1].trim());
      }
    }
    let result = classNames.reduce((createMultiPromise, nextName) => {
      return createMultiPromise.then(async () => {
        return await this.createClasses(nextName);
      });
    }, Promise.resolve());
    result.then(() => {
      this.notificationService.showSuccessMessage('Tạo thành công!');
      this.data = '';
    }).catch(() => {
      this.notificationService.showErrorMessage('Tạo thất bại!');
    });
  }

  createClasses(classesName: string) {
    let classes: Classes = {
      name: classesName
    };
    return this.classesService.createClasses(classes).toPromise();
  }
}
