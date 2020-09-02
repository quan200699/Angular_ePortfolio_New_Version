import {Component, OnInit} from '@angular/core';
import {Classes} from '../../interface/classes';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ClassesService} from '../../service/classes/classes.service';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  classes: Classes = {
    name: '',
    module: {
      id: -1
    },
    lecture: {
      id: -1
    }
  };
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private classesService: ClassesService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.classes = await this.getClasses(this.id);
    });
  }

  getClasses(id: number) {
    return this.classesService.getClasses(id).toPromise();
  }

  updateClasses(id: number) {
    this.classesService.updateClasses(id, this.classes).subscribe(() => {
      this.notificationService.showSuccessMessage("Cập nhật thành công!")
    }, () => {
      this.notificationService.showErrorMessage("Cập nhật thất bại!")
    });
  }
}
