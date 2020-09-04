import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Student} from '../../interface/student';
import {StudentService} from '../../service/student/student.service';
import {Product} from '../../interface/product';
import {ProductService} from '../../service/product/product.service';
import {UserToken} from '../../interface/user-token';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {OnlineCourse} from '../../interface/online-course';
import {OnlineCourseService} from '../../service/online-course/online-course.service';
import {CertificateService} from '../../service/certificate/certificate.service';
import {Certificate} from '../../interface/certificate';
import {Evaluations} from '../../interface/evaluations';
import {Description} from '../../interface/description';
import {DescriptionService} from '../../service/description/description.service';
import {EvaluationsService} from '../../service/evaluations/evaluations.service';

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
  product: Product = {
    name: '',
    linkProduct: '',
    notice: ''
  };
  certificate: Certificate = {
    complete: false
  };
  isShowed: boolean = false;
  listOnlineCourses: OnlineCourse[] = [];
  isEditOnlineCourse: boolean = false;
  index: number = -1;
  numberOfCertificateIsCompleted: number = 0;
  evaluations: Evaluations = {
    name: '',
    evaluation: ''
  };
  description: Description = {
    achiles: '',
    advantage: '',
    suggestion: ''
  };

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private productService: ProductService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private onlineCourseService: OnlineCourseService,
              private certificateService: CertificateService,
              private descriptionService: DescriptionService,
              private evaluationService: EvaluationsService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getStudent(this.id);
      this.getAllProductByStudent(this.id);
      this.countNumberOfCertificate(this.id);
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
    this.getAllOnlineCourse();
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

  createProduct() {
    this.product.student = {
      id: this.id
    };
    this.productService.createProduct(this.product).subscribe(() => {
      this.productService.getAllProductByStudent(this.id).subscribe((listProduct) => {
        this.listProducts = listProduct;
      });
      this.notificationService.showSuccessMessage('Tạo mới thành công!');
      this.product = {};
    }, () => {
      this.notificationService.showErrorMessage('Tạo mới thất bại!');
    });
  }

  showCreateForm() {
    this.isShowed = !this.isShowed;
  }

  getAllOnlineCourse() {
    this.onlineCourseService.getAllOnlineCourse().subscribe(listOnlineCourse => {
      this.listOnlineCourses = listOnlineCourse;
      this.listOnlineCourses.map(async onlineCourse => {
        let certificate = await this.getCertificate(onlineCourse);
        onlineCourse.complete = certificate.complete;
      });
      $(function() {
        $('#table-online-course').DataTable({
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

  async showEditForm(onlineCourse: OnlineCourse, index) {
    this.isEditOnlineCourse = !this.isEditOnlineCourse;
    this.index = index;
    this.certificate = await this.getCertificate(onlineCourse);
    if (this.certificate == null) {
      this.certificate = {
        complete: false
      };
    }
  }

  getCertificate(onlineCourse: OnlineCourse) {
    return this.certificateService.getCertificateByStudentAndOnlineCourse(this.id, onlineCourse.id).toPromise();
  }

  async saveCertificate(onlineCourse: OnlineCourse) {
    let certificate = await this.getCertificate(onlineCourse);
    if (certificate == null) {
      certificate = {
        complete: this.certificate.complete,
        onlineCourse: {
          id: onlineCourse.id
        },
        student: {
          id: this.id
        }
      };
      this.createCertificate(certificate);
    } else {
      certificate.complete = this.certificate.complete;
      this.updateCertificate(certificate);
    }
  }

  createCertificate(certificate) {
    this.certificateService.createCertificate(certificate).subscribe(() => {
      this.notificationService.showSuccessMessage('Cập nhật thành công!');
      this.certificate = {};
    }, () => {
      this.notificationService.showErrorMessage('Cập nhật thất bại!');
    });
  }

  updateCertificate(certificate) {
    this.certificateService.updateCertificate(certificate.id, certificate).subscribe(() => {
      this.notificationService.showSuccessMessage('Cập nhật thành công!');
      this.certificate = {};
    }, () => {
      this.notificationService.showErrorMessage('Cập nhật thất bại!');
    });
  }

  countNumberOfCertificate(id) {
    return this.certificateService.countNumberOfCertificateComplete(id).subscribe(numbers => {
      this.numberOfCertificateIsCompleted = numbers;
    });
  }

  async createEvaluation() {
    let description = await this.createDescription(this.description);
    if (description != null) {
      this.evaluations.description = {
        id: description.id
      };
      this.evaluations.template = {
        id: this.student.template.id
      };
      this.evaluationService.createDescription(this.evaluations).subscribe(() => {
        this.notificationService.showSuccessMessage('Đánh giá thành công!');
        this.evaluations = {};
        description = {};
      }, () => {
        this.notificationService.showErrorMessage('Đánh giá thất bại!');
      });
    }
  }

  createDescription(description) {
    return this.descriptionService.createDescription(description).toPromise();
  }
}
