import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../interface/user-token';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Category} from '../../interface/category';
import {CategoryService} from '../../service/category/category.service';

declare var $: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  listCategory: Category[];
  currentUser: UserToken;
  hasRoleAdmin = false;
  id: number;

  constructor(private categoryService: CategoryService,
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
    this.getAllLecture();
  }

  getCategoryId(id: number) {
    this.id = id;
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.id).subscribe(() => {
      this.categoryService.getAllCategory().subscribe(listCategory => {
        this.listCategory = listCategory;
      });
      $(function() {
        $('#modal-delete').modal('hide');
      });
      this.notificationService.showSuccessMessage('Xóa thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Xóa thất bại!');
    });
  }

  getAllLecture() {
    this.categoryService.getAllCategory().subscribe(listCategory => {
      this.listCategory = listCategory;
      $(function() {
        $('#table-category').DataTable({
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
