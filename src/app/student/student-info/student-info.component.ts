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
import * as pdfMakeConfig from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as pdfMake from 'pdfmake/build/pdfmake';
import {OutcomeService} from '../../service/outcome/outcome.service';
import {CategoryService} from '../../service/category/category.service';
import {SkillService} from '../../service/skill/skill.service';
import {Category} from '../../interface/category';
import {Skill} from '../../interface/skill';
import {Outcome} from '../../interface/outcome';

pdfMakeConfig.vfs = pdfFonts.pdfMake.vfs;

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
    advantages: '',
    suggestion: ''
  };
  listEvaluations: Evaluations[] = [];
  evaluationId: number;
  listOutcome: Outcome[] = [];
  array: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private productService: ProductService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private onlineCourseService: OnlineCourseService,
              private certificateService: CertificateService,
              private descriptionService: DescriptionService,
              private evaluationService: EvaluationsService,
              private outcomeService: OutcomeService,
              private categoryService: CategoryService,
              private skillService: SkillService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getStudent(this.id);
      this.getAllProductByStudent(this.id);
      this.countNumberOfCertificate(this.id);
      this.getAllEvaluationsByStudent(this.id);
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
    this.getAllOutcome();
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
        $('#modal-delete1').modal('hide');
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

  getStudentToPromise(id: number) {
    return this.studentService.getStudent(id).toPromise();
  }

  async createEvaluation() {
    let description = await this.createDescription(this.description);
    if (description != null) {
      this.evaluations.description = {
        id: description.id
      };
      this.evaluations.student = {
        id: this.id
      };
      this.evaluationService.createDescription(this.evaluations).subscribe(() => {
        this.notificationService.showSuccessMessage('Đánh giá thành công!');
        this.evaluations = {};
        this.description = {};
      }, () => {
        this.notificationService.showErrorMessage('Đánh giá thất bại!');
      });
    }
  }

  createDescription(description) {
    return this.descriptionService.createDescription(description).toPromise();
  }

  getAllEvaluationsByStudent(id: number) {
    this.evaluationService.getAllEvaluationsByStudent(id).subscribe(listEvaluation => {
      this.listEvaluations = listEvaluation;
      this.listEvaluations.map(evaluations => {
        evaluations.createDate = new Date(evaluations.createDate);
      });
    });
  }

  getAllEvaluationsByStudentToPromise(id: number) {
    return this.evaluationService.getAllEvaluationsByStudent(id).toPromise();
  }

  getEvaluationId(id: any) {
    this.evaluationId = id;
  }

  deleteEvaluations() {
    this.evaluationService.deleteEvaluations(this.evaluationId).subscribe(() => {
      this.evaluationService.getAllEvaluationsByStudent(this.id).subscribe(listEvaluations => {
        this.listEvaluations = listEvaluations;
      });
      $(function() {
        $('#modal-delete2').modal('hide');
      });
      this.notificationService.showSuccessMessage('Xóa thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Xóa thất bại!');
    });
  }

  getAllCategoryByOutcome(id: number) {
    return this.outcomeService.getAllCategoryByOutcome(id).toPromise();
  }

  getAllSkillByCategory(id: number) {
    return this.categoryService.getAllSkillByCategory(id).toPromise();
  }

  getEvaluationDetailByEvaluationAndSkill(id: number, skillId: number) {
    return this.evaluationService.getAllEvaluationsDetailByEvaluationAndSkill(id, skillId).toPromise();
  }

  async getAllOutcome() {
    let listOutcome = await this.outcomeService.getAllOutcome().toPromise();
    this.sortOutcome(listOutcome);
    for (let i = 0; i < listOutcome.length; i++) {
      this.array.push(listOutcome[i]);
      let categoryList = await this.outcomeService.getAllCategoryByOutcome(listOutcome[i].id).toPromise();
      this.sortCategory(categoryList);
      for (let j = 0; j < categoryList.length; j++) {
        this.array.push(categoryList[j]);
        let skillList = await this.categoryService.getAllSkillByCategory(categoryList[j].id).toPromise();
        this.sortSkill(skillList);
        for (let k = 0; k < skillList.length; k++) {
          let evaluationList = await this.getAllEvaluationsByStudentToPromise(this.id);
          if (evaluationList[0] != null) {
            skillList[k].evaluations1 = await this.getEvaluationDetailByEvaluationAndSkill(evaluationList[0].id, skillList[k].id);
          }
          if (evaluationList[1] != null) {
            skillList[k].evaluations2 = await this.getEvaluationDetailByEvaluationAndSkill(evaluationList[1].id, skillList[k].id);
          }
          if (evaluationList[2] != null) {
            skillList[k].evaluations3 = await this.getEvaluationDetailByEvaluationAndSkill(evaluationList[2].id, skillList[k].id);
          }
          if (evaluationList[3] != null) {
            skillList[k].evaluations4 = await this.getEvaluationDetailByEvaluationAndSkill(evaluationList[3].id, skillList[k].id);
          }
          if (evaluationList[4] != null) {
            skillList[k].evaluations5 = await this.getEvaluationDetailByEvaluationAndSkill(evaluationList[4].id, skillList[k].id);
          }
          if (evaluationList[5] != null) {
            skillList[k].evaluations6 = await this.getEvaluationDetailByEvaluationAndSkill(evaluationList[5].id, skillList[k].id);
          }
          this.array.push(skillList[k]);
        }
      }
    }
  }

  sortOutcome(outcomeList) {
    for (let i = 0; i < outcomeList.length; i++) {
      for (let j = i + 1; j < outcomeList.length; j++) {
        let indexFirst = outcomeList[i].title.split('')[5];
        let indexSecond = outcomeList[j].title.split('')[5];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = outcomeList[i];
          outcomeList[i] = outcomeList[j];
          outcomeList[j] = temp;
        }
      }
    }
  }

  sortCategory(categoryList) {
    for (let i = 0; i < categoryList.length; i++) {
      for (let j = i + 1; j < categoryList.length; j++) {
        let indexFirst = categoryList[i].categoryId.split('.')[1];
        let indexSecond = categoryList[j].categoryId.split('.')[1];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = categoryList[i];
          categoryList[i] = categoryList[j];
          categoryList[j] = temp;
        }
      }
    }
  }

  sortSkill(skillList) {
    for (let i = 0; i < skillList.length; i++) {
      for (let j = i + 1; j < skillList.length; j++) {
        let indexFirst = skillList[i].skillId.split('.')[1];
        let indexSecond = skillList[j].skillId.split('.')[1];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = skillList[i];
          skillList[i] = skillList[j];
          skillList[j] = temp;
        }
      }
    }
    for (let i = 0; i < skillList.length; i++) {
      for (let j = i + 1; j < skillList.length; j++) {
        let indexFirst = skillList[i].skillId.split('.')[2];
        let indexSecond = skillList[j].skillId.split('.')[2];
        if (Number(indexFirst) > Number(indexSecond)) {
          let temp = skillList[i];
          skillList[i] = skillList[j];
          skillList[j] = temp;
        }
      }
    }
  }

  getAllOutcomeToPromise() {
    return this.outcomeService.getAllOutcome().toPromise();
  }

  convertDateToString(date: Date): string {
    let term = '';
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    if (day < 10) {
      term += '0';
    }
    term += day + '/';
    if (month < 10) {
      term += '0';
    }
    term += month + '/';
    term += date.getUTCFullYear();
    return term;
  }

  generatePdf(action, student, evaluations, listEvaluations) {
    let studentName = student.name;
    let className = student.classes != null ? student.classes.name : '';
    let fileName = studentName + '-' + className + '.pdf';
    const documentDefinition = this.getDocumentDefinition(student, evaluations, listEvaluations);
    switch (action) {
      case 'open':
        pdfMake.createPdf(documentDefinition).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(documentDefinition).download(fileName);
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition(student, evaluations, listEvaluations) {
    return {
      pageMargins: [70, 120, 65, 60],
      header: this.buildPortfolioHeader(),
      content: this.buildPortfolioContent(student, evaluations, listEvaluations),
      footer: this.buildPortfolioFooter()
    };
  }

  buildPortfolioHeader = () => [
    {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABs0AAAAKCAYAAAD/5BAmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB/SURBVHhe7dkxAYAwEMDABzGVgx7k1GlZcJG7KR5yrfWeAQAAAAAAgKi9n7n/BgAAAAAAgCzTDAAAAAAAgDzTDAAAAAAAgDzTDAAAAAAAgDzTDAAAAAAAgDzTDAAAAAAAgDzTDAAAAAAAgDzTDAAAAAAAgDzTDAAAAAAAgLiZD+JBA2Xrm5A4AAAAAElFTkSuQmCC',
      height: 5
    },
    {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAADPCAYAAAA9FY5bAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAGhySURBVHhe7b0HgCVF1fZ/5obJm1kW2EgOSlYRMZAFVERRBARUTKCCqEgSlKTia0JRQRREJUiQoICKIOiLJJHMkpGFhWVzmJ1w8//5neq+c2eZTZd9v+//vVvPnZrurnDq1KlTp05V9+3bctddd9UsIiIiogm0bLbZSdGARERENIVMcoyIiIhYbUQDEhER0TSiAYmIiGga0YBEREQ0jWhAIiIimkY0IBEREU0jGpCIiIimEQ1IRERE04gGJCIiomlEAxIREdE0ogGJiIhoGi1bbHFm/C5MREREU2jZfPMzogGJiIhoCtEDiYiIaBrRA4mIiGgacRM1IiKiacQlTERERNOIHkhERETTiHsgERERTSMuYSIiIppGXMJEREQ0jbiEiYiIaBpxCRMREdE0ogcSERHRNKIHEhER0TTiJmpERETTiEuYiIiIphGXMBEREU0jeiARERFNI+6BRERENI24hImIiGgacQkTERHRNOISJiIiomnEJUxERETTiEuYiIiIphE9kIiIiKYR90AiIiKaRlzCRERENI24hImIiGgacQkTERHRNOISJiIiomnEJUxERETTiEuYiIiIphENSERERNOIBiQiIqJpxE3UiIiIphE3USMiIppGXMJEREQ0jbiEiYiIaBpxCRMREdE04hImIiKiacQlTERERNOIS5iIiIimET2QiIiIphH3QCIiIppGXMJEREQ0jbiEiYiIaBrRA4mIiGgacQ8kIiKiacQlTERERNOIS5iIiIimEZcwERERTSMuYSIiIppGXMJEREQ0jbiEiYiIaBpxCRMREdE04hImIiKiaUQPJCIiomlEDyQiIqJpxE3UiIiIphGXMBEREU0jLmEiIiKaRlzCRERENI24hImIiGgacQkTERHRNOISJiIiomnEJUxERETTiEuYiIiIphE9kIiIiKaxBvdAWpKQYtlrkMatSlhTGI52GlKsStqK0JgnPX+9YWVY3XzDhRTDpTWGFMu7boxLMVxaY9zKwnBYNi09T+OXl7aqCDQaP2nc8HSWTQ8hPVs1DJeba4bmqlMJaMyf0h0upFj2evWRaWlRg19vUGNbLBtC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',
      width: 110,
      height: 80,
      margin: [20, 0, 0, 0],
    }
  ];

  buildPortfolioContent = (student, evaluations, listEvaluations) => {
    let title = '';
    let program = '';
    if (student.classes != null) {
      if (student.classes.module != null) {
        if (student.classes.module.program != null) {
          if (student.classes.module.program.name.toUpperCase().includes('JAVA')) {
            title = 'BOOTCAMP JAVA';
          } else {
            title = 'BOOTCAMP PHP';
          }
          program = student.classes.module.program.name;
        }
      }
    }
    return [
      this.buildPortfolioTitle(title),
      this.buildPortfolioDescription(),
      this.buildPortfolioInfo(student, program),
      this.buildPortfolioGeneralAssessment(evaluations, student),
      this.buildPortfolioDetail(program, evaluations, listEvaluations)
    ];
  };

  buildPortfolioFooter = () => ({
    columns: [
      {
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAAACCAIAAAAM8wO7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVDhPY9DQaBhFgw39//9/NGIGI/r//z8AUtfhW6CNZKoAAAAASUVORK5CYII=',
        width: 136,
        height: 2,
        margin: [0, 5, 0, 0],
      },
      {
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIXSURBVChTRVJtT1JhGD5/S7P1IfGA5KzVCMycrflSP6FWVh/Shn0QQUU4vCgckPdaAuIwCDgoINRsAzcQRY8cOQc2/M6pi2Tr2dmecz/39dz3dV33Q4ii+Offqte5Nf26Qjl2d5AclJBK1bjBaOJ5/iYLWA/q8weAmHz23E478/kCPpudfjoxKSFl28FQD4otEPjS1z9gpx3NZqvT6dQ57vyCxTkvCCazpa//djAURkhwHId6tMMZiydQ27ppQ3pJo3V7vE6XO5vLUSYzKZW3Wi1iTW9AI1zKFwqNRqN0fFyrnZ+cVMuVymW9fnT0GynFYxVqEdDh8wW+bQfn3n3guKtXr98kk8xOZPft3HvuqhtG975vbNqmpmcJiIUIhtlHd3ShaWexWCr8/OVwukB9y+XJ5g6Z9L5kSNaFHuYL0eiexbrB88LKqh64dPoAxsGpdYMxkUwxTJqUDhNj4xNbLncksqtWLwI6v/Apk8nG4j/Ui58FQfg4v5BIpCjKPDP7kjBSZrgN7sVSCW5Uq6cse3l2VoO4C5YtlytI3X/wEOUImDdEDlMmy0Em6w98hVKzxbqk0Xl9fo/XBzKaZa18ZLTdbndHEAqF4bORMglCEyEuwwr8NHh+Wau7NXAHfBD2BhsO70hlcqXqiV5vSKWYZDKlW1l9pFDeGxmNxeIA/H8DWLAGs52eeQE+GA90gF+7fX2TFUXxL6//n7VzLF42AAAAAElFTkSuQmCC',
        width: 14,
        height: 14,
        margin: [20, 0, 0, 0],
      },
      {
        text: 'www.codegym.vn',
        margin: [25, 0, 0, 0],
      }
    ]
  });

  buildPortfolioTitle = (title) => ({
    text: title + '\n' +
      'ĐÁNH GIÁ NĂNG LỰC\n',
    bold: true,
    fontSize: 24,
    alignment: 'center',
    color: '#090e91',
    margin: [0, 0, 0, 5]
  });

  buildPortfolioInfo = (student, program) => ({
    columns: [
      [
        {
          text: 'Huấn luyện viên: ' + (student.classes != null ? (student.classes.lecture != null ? (student.classes.lecture.name) : '') : ''),
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        {
          text: 'Học viên: ' + student.name,
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        {
          text: 'Mã học viên: ' + student.studentId,
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        {
          text: 'Lớp: ' + (student.classes != null ? student.classes.name : ''),
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        {
          text: 'Chương trình học: ' + program,
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        }
      ]
    ]
  });

  buildPortfolioDescription = () => [
    {
      text: '(Dành cho Huấn luyện viên)\n' +
        '\n' +
        'Huấn luyện viên sử dụng Rubric đánh giá năng lực dựa trên các hạng mục sau:\n',
      bold: true,
      italics: true,
      fontSize: 12,
      alignment: 'center',
      margin: [0, 0, 0, 5]
    }, {
      text: '1.\tKết quả bài thi lý thuyết và thực hành cuối module của học viên\n' +
        '2.\tQuá trình học của học viên: bài tập, bài thực hành, quiz,…\n',
      italics: true,
      fontSize: 11,
      alignment: 'left',
      margin: [30, 0, 0, 30]
    }
  ];

  buildPortfolioGeneralAssessment = (evaluations, student) => {
    return [
      {
        text: '\nI. ĐÁNH GIÁ CHUNG\n' +
          '1. Mức độ đánh giá (3) \n' + evaluations.evaluation,
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 20]
      },
      {
        text: '\n2. Nhận xét chung\n',
        fontSize: 12,
        bold: true
      },
      {
        text: 'Điểm mạnh:\n' + (evaluations.description != null ? evaluations.description.advantages : ''),
        fontSize: 12,
        italics: true,
      },
      {
        text: 'Điểm yếu:\n' + (evaluations.description != null ? evaluations.description.achiles : ''),
        fontSize: 12,
        italics: true,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Gợi ý cho doanh nghiệp:' + (evaluations.description != null ? '\n' + evaluations.description.suggestion : '..........................'),
        fontSize: 12,
        italics: true,
        margin: [0, 0, 0, 45]
      },
      {
        text: '\nHà Nội, ngày ' + evaluations.createDate.getUTCDate() + ' tháng '
          + (evaluations.createDate.getMonth() + 1) + ' năm ' + evaluations.createDate.getUTCFullYear(),
        alignment: 'right',
        fontSize: 12,
      },
      {
        text: '\nHUẤN LUYỆN VIÊN',
        alignment: 'right',
        fontSize: 12,
        margin: [0, 0, 40, 20],
      },
      {
        text: (student.classes != null ? (student.classes.lecture != null ? (student.classes.lecture.name) : '') : '').toUpperCase(),
        alignment: 'right',
        bold: true,
        fontSize: 12,
        margin: [0, 60, 40, 10],
        pageBreak: 'after'
      }
    ];
  };

  buildPortfolioDetail = (program, evaluations, listEvaluations) => ([
      this.buildPortfolioDetailedAssessment(),
      this.buildPortfolioOutcome(program, evaluations, listEvaluations),
      this.buildPortfolioOnlineCourseText(),
      this.buildPortfolioOnlineCourse(),
      this.buildPortfolioAddendum(),
      this.buildPortfolioProductTable(),
      this.buildPortfolioNote()
    ]
  );

  buildPortfolioDetailedAssessment = () => ({
    text: 'II. CHI TIẾT\n' +
      '1/ ĐÁNH GIÁ CHI TIẾT \n',
    fontSize: 12,
    bold: true,
    margin: [0, 0, 0, 20]
  });

  buildPortfolioOutcome = (program, evaluations, listEvaluations) => ({
    margin: [0, 0, 0, 20],
    table: {
      widths: program.toUpperCase().includes('JAVA') ? ['auto', 120, 44, 44, 44, 44, 44, 44]
        : ['auto', 120, 44, 44, 44, 44, 44],
      heights: [20],
      body: [
        [
          {
            text: '\nCHUẨN ĐẦU RA\n ',
            style: 'tableHeader',
            colSpan: 2,
            alignment: 'center',
            fontSize: 11,
            bold: true,
            fillColor: '#2e6ad1',
            color: 'white'
          },
          {},
          {
            text: '\nĐÁNH GIÁ\n ',
            style: 'tableHeader',
            colSpan: program.toUpperCase().includes('JAVA') ? 6 : 5,
            alignment: 'center',
            fontSize: 11,
            bold: true,
            fillColor: '#2e6ad1',
            color: 'white'
          },
          {}, {}, {}, {}, program.toUpperCase().includes('JAVA') ? {} : ''
        ],
        ...this.array.map(array => {
          if (array.title != undefined) {
            if (array.title.toUpperCase().includes('PHẦN 1')) {
              return [{
                text: array.title,
                colSpan: 2,
                alignment: 'left',
                bold: true,
                fontSize: 11,
              }, {},
                {
                  text: '\n' + (listEvaluations[0] != null ? this.convertDateToString(listEvaluations[0].createDate) : '')
                    + '\n ',
                  alignment: 'left',
                  bold: true,
                  fontSize: 8,
                },
                {
                  text: '\n' + (listEvaluations[1] != null ? this.convertDateToString(listEvaluations[1].createDate) : '')
                    + '\n ',
                  alignment: 'left',
                  bold: true,
                  fontSize: 8,
                },
                {
                  text: '\n' + (listEvaluations[2] != null ? this.convertDateToString(listEvaluations[2].createDate) : '')
                    + '\n ',
                  alignment: 'left',
                  bold: true,
                  fontSize: 8,
                },
                {
                  text: '\n' + (listEvaluations[3] != null ? this.convertDateToString(listEvaluations[3].createDate) : '')
                    + '\n ',
                  alignment: 'left',
                  bold: true,
                  fontSize: 8,
                },
                {
                  text: '\n' + (listEvaluations[4] != null ? this.convertDateToString(listEvaluations[4].createDate) : '')
                    + '\n ',
                  alignment: 'left',
                  bold: true,
                  fontSize: 8,
                },
                program.toUpperCase().includes('JAVA') ? {
                  text: '\n' + (listEvaluations[5] != null ? this.convertDateToString(listEvaluations[5].createDate) : '')
                    + '\n ',
                  alignment: 'left',
                  bold: true,
                  fontSize: 8,
                } : ''];
            } else {
              return [{
                text: array.title,
                style: 'tableHeader',
                colSpan: program.toUpperCase().includes('JAVA') ? 8 : 7,
                alignment: 'left',
                bold: true,
                fontSize: 11,
              }, {},
                {}, {}, {}, {}, {}, program.toUpperCase().includes('JAVA') ? {} : ''];
            }
          } else if (array.categoryId != undefined) {
            return [{
              text: array.categoryId,
              style: 'tableHeader',
              alignment: 'right',
              bold: true,
              fontSize: 11,
            },
              {
                text: array.name,
                style: 'tableHeader',
                alignment: 'left',
                colSpan: program.toUpperCase().includes('JAVA') ? 7 : 6,
                bold: true,
                fontSize: 11,
              }, {}, {}, {}, {}, {}, program.toUpperCase().includes('JAVA') ? {} : ''];
          }
          return [
            {
              text: array.skillId,
              alignment: 'right',
              fontSize: 10,
            },
            {
              text: array.name,
              alignment: 'left',
              fontSize: 10,
            },
            {
              text: array.evaluations1 != null ? ('\n' + array.evaluations1.evaluation + '\n ') : '',
              alignment: 'center',
              fontSize: 10,
            },
            {
              text: array.evaluations2 != null ? ('\n' + array.evaluations2.evaluation + '\n ') : '',
              alignment: 'center',
              fontSize: 10,
            },
            {
              text: array.evaluations3 != null ? ('\n' + array.evaluations3.evaluation + '\n ') : '',
              alignment: 'center',
              fontSize: 10,
            },
            {
              text: array.evaluations4 != null ? ('\n' + array.evaluations4.evaluation + '\n ') : '',
              alignment: 'center',
              fontSize: 10,
            },
            {
              text: array.evaluations5 != null ? ('\n' + array.evaluations5.evaluation + '\n ') : '',
              alignment: 'center',
              fontSize: 10,
            },
            program.toUpperCase().includes('JAVA') ? {
              text: array.evaluations6 != null ? ('\n' + array.evaluations6.evaluation + '\n ') : '',
              alignment: 'center',
              fontSize: 10,
            } : ''
          ];
        })
      ],
    }
  });

  buildPortfolioOnlineCourse = () => ({
    table: {
      widths: [40, '*', 'auto'],
      body: [
        [
          {
            text: '\nSTT',
            style: 'tableHeader',
            alignment: 'center',
            fontSize: 12,
            bold: true
          },
          {
            text: '\nKhóa học',
            style: 'tableHeader',
            alignment: 'center',
            fontSize: 12,
            bold: true
          },
          {
            text: 'Đánh giá\n' +
              '(Đã có chứng chỉ hoàn thành, Chưa có chứng\n chỉ hoàn thành)\n',
            style: 'tableHeader',
            alignment: 'center',
            fontSize: 12,
            bold: true
          }
        ],
        ...this.listOnlineCourses.map(onlineCourse => {
          {
            return [
              {
                text: onlineCourse.id,
                alignment: 'center',
                fontSize: 12,
                bold: true
              },
              {
                text: onlineCourse.name,
                alignment: 'left',
                fontSize: 12,
                bold: true
              },
              {
                text: onlineCourse.complete ? 'Đã có chứng chỉ' : 'Chưa có chứng chỉ',
                alignment: 'left',
                fontSize: 12,
                bold: true
              }
            ];
          }
        })
      ]
    }
  });

  buildPortfolioAddendum = () => ({
    text: 'III. PHỤ LỤC\n' +
      'Những sản phẩm/dự án đã đạt được',
    fontSize: 12,
    bold: true,
    margin: [0, 20, 0, 20]
  });

  buildPortfolioProductTable = () => ({
    table: {
      widths: ['auto', '*', 200, 60],
      heights: [10],
      body: [
        [
          {
            text: '#',
            style: 'tableHeader',
            alignment: 'center',
            fontSize: 12,
            bold: true
          },
          {
            text: 'Sản phẩm',
            style: 'tableHeader',
            alignment: 'center',
            fontSize: 12,
            bold: true
          },
          {
            text: 'Link',
            style: 'tableHeader',
            alignment: 'center',
            fontSize: 12,
            bold: true
          },
          {
            text: 'Ghi chú',
            style: 'tableHeader',
            alignment: 'center',
            fontSize: 12,
            bold: true
          }
        ],
        ...this.listProducts.map(product => {
          {
            return [
              {
                text: product.id,
                alignment: 'center',
                fontSize: 12
              },
              {
                text: product.name,
                alignment: 'left',
                fontSize: 12
              },
              {
                text: product.linkProduct,
                alignment: 'left',
                fontSize: 12
              },
              {
                text: product.notice,
                alignment: 'left',
                fontSize: 12
              },
            ];
          }
        })
      ]
    }
  });

  buildPortfolioNote() {
    return [
      {
        text: 'Chú thích:',
        fontSize: 12,
        bold: true,
        margin: [0, 20, 0, 0]
      },
      {
        text: '(1) Mức độ đánh giá chuẩn đầu ra',
        fontSize: 12,
        bold: true
      },
      this.buildPortfolioOutcomeNoteLevel(),
      {
        text: '(2) Chuẩn đầu ra',
        fontSize: 12,
        margin: [0, 5, 0, 5],
        bold: true
      },
      this.buildPortfolioOutcomeNote(),
      {
        text: '(3) Mức đánh giá năng lực khi kết thúc cả chương trình',
        fontSize: 12,
        margin: [0, 5, 0, 5],
        bold: true
      },
      this.buildPortfolioStudentLevelAfterGraduating()
    ];
  }

  buildPortfolioOutcomeNoteLevel = () => ({
    ul: [
      {
        text: [
          {
            text: 'Chưa đạt: ',
            bold: true
          },
          'Học viên chưa có đủ khả năng để giải quyết các vấn đề liên quan đến năng lực đang được đánh giá.'
        ],
        margin: [25, 5, 0, 0]
      },
      {
        text: [
          {
            text: 'Đạt: ',
            bold: true
          },
          'Học viên có đủ khả năng để giải quyết các vấn đề đơn giản liên quan đến năng lực đang được đánh giá, tuy nhiên chưa đủ năng lực để giải quyết các vấn đề phức tạp hơn hoặc giải quyết các vấn đề một cách hiệu quả, nhanh chóng'
        ],
        margin: [25, 5, 0, 0]
      },
      {
        text: [
          {
            text: 'Tốt: ',
            bold: true
          },
          'Học viên có đủ khả năng để giải quyết phần lớn các vấn đề liên quan đến năng lực đang được đánh giá với một mức độ hiệu quả và thời gian chấp nhận được.'
        ],
        margin: [25, 5, 0, 0]
      },
      {
        text: [
          {
            text: 'Xuất sắc: ',
            bold: true
          },
          'Học viên có đủ khả năng để giải quyết hầu hết tất cả các vấn đề liên quan đến năng lực đang được đánh giá với mức độ hiệu quả cao trong một khoảng thời gian nhanh chóng.'
        ],
        margin: [25, 5, 0, 0]
      }
    ]
  });

  buildPortfolioOutcomeNote = () => ({
    ul: [
      {
        text: 'Các chuẩn đầu ra không đánh dấu sao là các chuẩn đầu ra mức cơ bản, bắt buộc dành cho tất cả các học viên.',
        margin: [25, 5, 0, 0]
      },
      {
        text: 'Các chuẩn đầu ra đánh dấu 1 sao (*) là dành cho các học viên có năng lực khá, có thể dành thêm thời để luyện tập mở rộng.',
        margin: [25, 5, 0, 0]
      },
      {
        text: 'Các chuẩn đầu ra đánh dấu 2 sao (**) là dành cho các học viên có năng lực rất khá, có thể dành thêm nhiều thời gian để luyện tập mở rộng.',
        margin: [25, 5, 0, 0]
      }
    ]
  });

  buildPortfolioStudentLevelAfterGraduating = () => ({
    ul: [
      {
        text: [
          {
            text: 'Chưa đạt: ',
            bold: true
          },
          'Không đạt được 100% năng lực bắt buộc.'
        ],
        margin: [25, 5, 0, 0]
      },
      {
        text: [
          {
            text: 'Đạt: ',
            bold: true
          },
          '100% năng lực bắt buộc.'
        ],
        margin: [25, 5, 0, 0]
      },
      {
        text: [
          {
            text: 'Tốt: ',
            bold: true
          },
          '100% năng lực bắt buộc và >= 80% năng lực 1 sao (*).'
        ],
        margin: [25, 5, 0, 0]
      },
      {
        text: [
          {
            text: 'Xuất sắc: ',
            bold: true
          },
          '100% năng lực bắt buộc và 100% năng lực 1 sao và >= 80% năng lực 2 sao (**).'
        ],
        margin: [25, 5, 0, 0]
      }
    ]
  });

  buildPortfolioOnlineCourseText = () => ({
    text: '2/  HOÀN THÀNH CÁC KHOÁ HỌC ONLINE\n',
    fontSize: 12,
    bold: true,
    margin: [0, 0, 0, 20],
  });
}
