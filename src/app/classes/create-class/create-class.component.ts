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
    let rows = this.data.split('\n');
    let createMultiClasses = rows.map(row => {
      let columns = row.split('\t');
      if (row.length >= 3) {
        this.createClasses(columns[1].trim());
      }
    });
    Promise.all(createMultiClasses).then(() => {
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
