import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Student} from '../../interface/student';
import {StudentService} from '../../service/student/student.service';
import {Product} from '../../interface/product';
import {ProductService} from '../../service/product/product.service';
import {UserToken} from '../../interface/user-token';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  student: Student = {};
  id: number;
  listProducts: Product[] = [];
  currentUser: UserToken;
  hasRoleAdmin = false;
  productId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private productService: ProductService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getStudent(this.id);
      this.getAllProductByStudent(this.id);
    });
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
  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe(student => {
      this.student = student;
    });
  }

  getAllProductByStudent(id: number) {
    this.productService.getAllProductByStudent(id).subscribe(listProduct => {
      this.listProducts = listProduct;
      $(function() {
        $('#table-product').DataTable({
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

  getProductId(id: number) {
    this.productId = id;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe(() => {
      this.productService.getAllProductByStudent(this.id).subscribe(listProduct => {
        this.listProducts = listProduct;
      });
      $(function() {
        $('#modal-delete').modal('hide');
      });
      this.notificationService.showSuccessMessage('Xóa thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Xóa thất bại!');
    });
  }
}
