import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../interface/user-token';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Skill} from '../../interface/skill';
import {SkillService} from '../../service/skill/skill.service';

declare var $: any;

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  listSkill: Skill[];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;

  constructor(private skillService: SkillService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ADMIN') {
          this.hasRoleAdmin = true;
        }
      }
    }
  }

  ngOnInit() {
    this.getAllSkill();
  }

  getSkillId(id: number) {
    this.id = id;
  }

  deleteSkill() {
    this.skillService.deleteSkill(this.id).subscribe(() => {
      this.skillService.getAllSkill().subscribe(listSkill => {
        this.listSkill = listSkill;
      });
      $(function() {
        $('#modal-delete').modal('hide');
      });
      this.notificationService.showSuccessMessage('Xóa thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Xóa thất bại!');
    });
  }

  getAllSkill() {
    this.skillService.getAllSkill().subscribe(listSkill => {
      this.listSkill = listSkill;
      $(function() {
        $('#table-skill').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false,
        });
      });
    });
  }
}
