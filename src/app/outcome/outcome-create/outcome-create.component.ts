import {Component, OnInit} from '@angular/core';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Outcome} from '../../interface/outcome';

@Component({
  selector: 'app-outcome-create',
  templateUrl: './outcome-create.component.html',
  styleUrls: ['./outcome-create.component.css']
})
export class OutcomeCreateComponent implements OnInit {
  data: string = '';

  constructor(private outcomeService: OutcomeService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  createMultiOutcome() {
    let rows = this.data.split('\n');
    let createMultiOutcomes = rows.map(row => {
      let columns = row.split('\t');
      if (columns[0].includes('PHẦN')) {
        this.createOutcome(columns[0].trim());
      }
    });
    Promise.all(createMultiOutcomes).then(() => {
      this.notificationService.showSuccessMessage('Tạo thành công!');
      this.data = '';
    }).catch(() => {
      this.notificationService.showErrorMessage('Tạo thất bại!');
    });
  }

  createOutcome(title) {
    let outcome: Outcome = {
      title: title
    };
    return this.outcomeService.createOutcome(outcome).toPromise();
  }
}
