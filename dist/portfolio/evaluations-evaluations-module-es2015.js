(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["evaluations-evaluations-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/evaluations/evaluations-info/evaluations-info.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/evaluations/evaluations-info/evaluations-info.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Content Header (Page header) -->\r\n<section class=\"content-header\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row mb-2\">\r\n      <div class=\"col-sm-6\">\r\n        <h1>Đánh giá chi tiết</h1>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <ol class=\"breadcrumb float-sm-right\">\r\n          <li class=\"breadcrumb-item\"><a routerLink=\"\">Trang chủ</a></li>\r\n          <li class=\"breadcrumb-item active\">Đánh giá chi tiết</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div><!-- /.container-fluid -->\r\n</section>\r\n\r\n<!-- Main content -->\r\n<section class=\"content\">\r\n  <div class=\"card-header\">\r\n    <h3 class=\"card-title\">Tạo đánh giá</h3>\r\n  </div>\r\n  <form id=\"evaluation-form\" (ngSubmit)=\"createMultiEvaluationDetail(listEvaluationDetail)\">\r\n    <div class=\"card-body\">\r\n      <div class=\"form-group\">\r\n        <label for=\"evaluations\">Tên bản đánh giá</label>\r\n        <input type=\"text\" id=\"evaluations\" [value]=\"evaluation!= null && evaluation.name\"\r\n               class=\"form-control\" disabled>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"evaluation_choice\">Đánh giá tất cả</label>\r\n        <select class=\"custom-select\" id=\"evaluation_choice\" name=\"evaluation_choice\" [(ngModel)]=\"evaluationChoice\"\r\n                (change)=\"setAllEvaluation()\">\r\n          <option [ngValue]=\"null\">Chọn mức đánh giá</option>\r\n          <option *ngFor=\"let evaluation of listEvaluation\" [value]=\"evaluation\">{{evaluation}}</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"row\" *ngFor=\"let outcome of listOutcome;index as i\">\r\n        <div class=\"col-12\">\r\n          <div class=\"row\">\r\n            <label class=\"col-10\">{{outcome.title}}</label>\r\n            <div class=\"form-group col-2\">\r\n              <select class=\"custom-select\" [(ngModel)]=\"evaluationOutcomeChoice[i]\"\r\n                      [ngModelOptions]=\"{standalone: true}\"\r\n                      (change)=\"setAllEvaluationByOutcome(outcome.id, i)\">\r\n                <option [ngValue]=\"null\">Chọn mức đánh giá</option>\r\n                <option *ngFor=\"let evaluation of listEvaluation\" [value]=\"evaluation\">{{evaluation}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\" *ngFor=\"let category of outcome.categories; index as j\">\r\n            <div class=\"col-12\">\r\n              <div class=\"row\">\r\n                <label class=\"col-10\">{{category.categoryId}} {{category.name}}</label>\r\n                <div class=\"form-group col-2\">\r\n                  <select class=\"custom-select\" [(ngModel)]=\"evaluationCategoryChoice[j]\"\r\n                          [ngModelOptions]=\"{standalone: true}\"\r\n                          (change)=\"setAllEvaluationByCategory(category.id, j)\">\r\n                    <option [ngValue]=\"null\">Chọn mức đánh giá</option>\r\n                    <option *ngFor=\"let evaluation of listEvaluation\" [value]=\"evaluation\">{{evaluation}}</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\" *ngFor=\"let skill of category.skills; index as k\">\r\n                <div class=\"col-1\">\r\n                  <label>{{skill.skillId}}</label>\r\n                </div>\r\n                <div class=\"form-group col-9\">\r\n                  <input type=\"text\" id=\"skills_{{k}}\" name=\"skills\" class=\"form-control\"\r\n                         [value]=\"skill.name\" disabled>\r\n                </div>\r\n                <div class=\"form-group col-2\">\r\n                  <select class=\"custom-select\" id=\"evaluation_{{k}}\" name=\"evaluation\"\r\n                          [(ngModel)]=\"evaluationDetail.evaluation\"\r\n                          (change)=\"addEvaluationDetailToList(skill, k)\">\r\n                    <option [ngValue]=\"null\" disabled\r\n                            [selected]=\"evaluationChoice==null || evaluationCategoryChoice[j] == null\">Chọn mức đánh giá\r\n                    </option>\r\n                    <option *ngFor=\"let evaluation of listEvaluation\" [value]=\"evaluation\"\r\n                            [selected]=\"evaluationChoice==evaluation|| evaluationCategoryChoice[j] == evaluation\r\n                             || evaluationOutcomeChoice[i] == evaluation||(skill.evaluations!=null &&\r\n                              skill.evaluations.evaluation == evaluation)\">{{evaluation}}</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-12\">\r\n          <a routerLink=\"/\" class=\"btn btn-secondary\">Hủy</a>\r\n          <input type=\"submit\" value=\"Tạo mới\" class=\"btn btn-success float-right\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- /.card-body -->\r\n  </form>\r\n</section>\r\n<!-- /.content -->\r\n");

/***/ }),

/***/ "./src/app/evaluations/evaluations-info/evaluations-info.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/evaluations/evaluations-info/evaluations-info.component.css ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V2YWx1YXRpb25zL2V2YWx1YXRpb25zLWluZm8vZXZhbHVhdGlvbnMtaW5mby5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/evaluations/evaluations-info/evaluations-info.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/evaluations/evaluations-info/evaluations-info.component.ts ***!
  \****************************************************************************/
/*! exports provided: EvaluationsInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationsInfoComponent", function() { return EvaluationsInfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _service_evaluations_detail_evaluations_detail_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/evaluations-detail/evaluations-detail.service */ "./src/app/service/evaluations-detail/evaluations-detail.service.ts");
/* harmony import */ var _service_skill_skill_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/skill/skill.service */ "./src/app/service/skill/skill.service.ts");
/* harmony import */ var _service_category_category_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../service/category/category.service */ "./src/app/service/category/category.service.ts");
/* harmony import */ var _service_outcome_outcome_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/outcome/outcome.service */ "./src/app/service/outcome/outcome.service.ts");
/* harmony import */ var _service_evaluations_evaluations_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/evaluations/evaluations.service */ "./src/app/service/evaluations/evaluations.service.ts");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../service/notification/notification.service */ "./src/app/service/notification/notification.service.ts");









let EvaluationsInfoComponent = class EvaluationsInfoComponent {
    constructor(activatedRoute, evaluationDetailService, skillService, categoryService, outcomeService, evaluationService, notificationService) {
        this.activatedRoute = activatedRoute;
        this.evaluationDetailService = evaluationDetailService;
        this.skillService = skillService;
        this.categoryService = categoryService;
        this.outcomeService = outcomeService;
        this.evaluationService = evaluationService;
        this.notificationService = notificationService;
        this.evaluationDetail = {
            evaluation: null
        };
        this.listEvaluation = ['Xuất sắc', 'Tốt', 'Đạt', 'Chưa đạt', 'N/A'];
        this.evaluationChoice = null;
        this.evaluationCategoryChoice = [];
        this.evaluationOutcomeChoice = [];
        this.listEvaluationDetail = [];
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            this.id = +paramMap.get('id');
            this.getEvaluation(this.id);
        });
    }
    ngOnInit() {
        this.getAllOutcome();
        this.getAllCategory();
        this.getAllSkill();
    }
    getEvaluation(id) {
        this.evaluationService.getEvaluations(id).subscribe(evaluation => {
            this.evaluation = evaluation;
            this.evaluation.createDate = new Date(this.evaluation.createDate);
        });
    }
    getAllOutcome() {
        this.outcomeService.getAllOutcome().subscribe(listOutcome => {
            this.listOutcome = listOutcome;
            for (let i = 0; i < listOutcome.length; i++) {
                this.evaluationOutcomeChoice[i] = null;
            }
            this.listOutcome.map((outcome) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                outcome.categories = yield this.getAllCategoryByOutcome(outcome.id);
                outcome.categories.map((category) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                    category.skills = yield this.getAllSkillByCategory(category.id);
                    category.skills.map((skill) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                        skill.evaluations = yield this.getEvaluationDetailByEvaluationAndSkill(this.id, skill.id);
                    }));
                }));
            }));
        });
    }
    getAllCategoryByOutcome(id) {
        return this.outcomeService.getAllCategoryByOutcome(id).toPromise();
    }
    getAllSkillByCategory(id) {
        return this.categoryService.getAllSkillByCategory(id).toPromise();
    }
    createMultiEvaluationDetail(listEvaluationDetail) {
        let result = listEvaluationDetail.reduce((createMultiPromise, evaluationDetail) => {
            return createMultiPromise.then(() => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                return yield this.createEvaluationDetail(evaluationDetail);
            }));
        }, Promise.resolve());
        result.then(() => {
            this.notificationService.showSuccessMessage('Đánh giá thành công!');
            this.clearAll();
        }).catch(() => {
            this.notificationService.showErrorMessage('Đánh giá thất bại!');
        });
    }
    setAllEvaluation() {
        this.skillService.getAllSkill().subscribe(listSkill => {
            for (let i = 0; i < listSkill.length; i++) {
                this.listEvaluationDetail[i] = {
                    evaluations: {
                        id: this.evaluation.id
                    },
                    skill: {
                        id: listSkill[i].id
                    },
                    evaluation: this.evaluationChoice
                };
            }
        });
    }
    setAllEvaluationByOutcome(id, index) {
        this.outcomeService.getAllCategoryByOutcome(id).subscribe(categoryList => {
            for (let j = 0; j < categoryList.length; j++) {
                this.categoryService.getAllSkillByCategory(categoryList[j].id).subscribe(skillList => {
                    for (let i = 0; i < skillList.length; i++) {
                        for (let k = 0; k < this.listEvaluationDetail.length; k++) {
                            if (skillList[i].id == this.listEvaluationDetail[k].skill.id) {
                                this.listEvaluationDetail[k] = {
                                    evaluations: {
                                        id: this.evaluation.id
                                    },
                                    skill: {
                                        id: skillList[i].id
                                    },
                                    evaluation: this.evaluationOutcomeChoice[index]
                                };
                            }
                        }
                    }
                });
            }
        });
    }
    setAllEvaluationByCategory(id, index) {
        this.categoryService.getAllSkillByCategory(id).subscribe(skillList => {
            for (let i = 0; i < skillList.length; i++) {
                if (skillList[i].id == this.listEvaluationDetail[i].skill.id) {
                    this.listEvaluationDetail[i] = {
                        evaluations: {
                            id: this.evaluation.id
                        },
                        skill: {
                            id: skillList[i].id
                        },
                        evaluation: this.evaluationCategoryChoice[index]
                    };
                }
            }
        });
    }
    addEvaluationDetailToList(skill, index) {
        const evaluationDetail = {
            evaluations: {
                id: this.evaluation.id
            },
            skill: {
                id: skill.id
            },
            evaluation: this.evaluationDetail.evaluation
        };
        if (this.listEvaluationDetail.length == 0) {
            this.listEvaluationDetail.push(evaluationDetail);
        }
        else {
            this.listEvaluationDetail[index] = evaluationDetail;
        }
    }
    createEvaluationDetail(evaluationDetail) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return yield this.evaluationDetailService.createEvaluationsDetail(evaluationDetail).toPromise();
        });
    }
    getAllCategory() {
        this.categoryService.getAllCategory().subscribe(listCategory => {
            for (let i = 0; i < listCategory.length; i++) {
                this.evaluationCategoryChoice[i] = null;
            }
        });
    }
    getAllSkill() {
        this.skillService.getAllSkill().subscribe(listSkill => {
            for (let i = 0; i < listSkill.length; i++) {
                let evaluationDetail = {
                    skill: listSkill[i],
                    evaluations: this.evaluation,
                    evaluation: 'N/A'
                };
                this.listEvaluationDetail.push(evaluationDetail);
            }
        });
    }
    clearAll() {
        this.listEvaluationDetail = [];
        this.getEvaluation(this.id);
        this.evaluationChoice = null;
        this.evaluationCategoryChoice = [];
        this.evaluationOutcomeChoice = [];
        this.getAllOutcome();
    }
    getEvaluationDetailByEvaluationAndSkill(id, skillId) {
        return this.evaluationService.getAllEvaluationsDetailByEvaluationAndSkill(id, skillId).toPromise();
    }
};
EvaluationsInfoComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _service_evaluations_detail_evaluations_detail_service__WEBPACK_IMPORTED_MODULE_3__["EvaluationsDetailService"] },
    { type: _service_skill_skill_service__WEBPACK_IMPORTED_MODULE_4__["SkillService"] },
    { type: _service_category_category_service__WEBPACK_IMPORTED_MODULE_5__["CategoryService"] },
    { type: _service_outcome_outcome_service__WEBPACK_IMPORTED_MODULE_6__["OutcomeService"] },
    { type: _service_evaluations_evaluations_service__WEBPACK_IMPORTED_MODULE_7__["EvaluationsService"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_8__["NotificationService"] }
];
EvaluationsInfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-evaluations-info',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./evaluations-info.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/evaluations/evaluations-info/evaluations-info.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./evaluations-info.component.css */ "./src/app/evaluations/evaluations-info/evaluations-info.component.css")).default]
    })
], EvaluationsInfoComponent);



/***/ }),

/***/ "./src/app/evaluations/evaluations-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/evaluations/evaluations-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: EvaluationsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationsRoutingModule", function() { return EvaluationsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _evaluations_info_evaluations_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./evaluations-info/evaluations-info.component */ "./src/app/evaluations/evaluations-info/evaluations-info.component.ts");




const routes = [
    {
        path: ''
    },
    {
        path: 'info/:id',
        component: _evaluations_info_evaluations_info_component__WEBPACK_IMPORTED_MODULE_3__["EvaluationsInfoComponent"]
    }
];
let EvaluationsRoutingModule = class EvaluationsRoutingModule {
};
EvaluationsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], EvaluationsRoutingModule);



/***/ }),

/***/ "./src/app/evaluations/evaluations.module.ts":
/*!***************************************************!*\
  !*** ./src/app/evaluations/evaluations.module.ts ***!
  \***************************************************/
/*! exports provided: EvaluationsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationsModule", function() { return EvaluationsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _evaluations_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./evaluations-routing.module */ "./src/app/evaluations/evaluations-routing.module.ts");
/* harmony import */ var _evaluations_info_evaluations_info_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./evaluations-info/evaluations-info.component */ "./src/app/evaluations/evaluations-info/evaluations-info.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");






let EvaluationsModule = class EvaluationsModule {
};
EvaluationsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _evaluations_info_evaluations_info_component__WEBPACK_IMPORTED_MODULE_4__["EvaluationsInfoComponent"],
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _evaluations_routing_module__WEBPACK_IMPORTED_MODULE_3__["EvaluationsRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]
        ]
    })
], EvaluationsModule);



/***/ }),

/***/ "./src/app/service/evaluations-detail/evaluations-detail.service.ts":
/*!**************************************************************************!*\
  !*** ./src/app/service/evaluations-detail/evaluations-detail.service.ts ***!
  \**************************************************************************/
/*! exports provided: EvaluationsDetailService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationsDetailService", function() { return EvaluationsDetailService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let EvaluationsDetailService = class EvaluationsDetailService {
    constructor(http) {
        this.http = http;
    }
    getAllEvaluationsDetail() {
        return this.http.get(API_URL + '/evaluation-details');
    }
    createEvaluationsDetail(evaluationsDetail) {
        return this.http.post(API_URL + '/evaluation-details', evaluationsDetail);
    }
    getEvaluationsDetail(id) {
        return this.http.get(API_URL + `/evaluation-details/${id}`);
    }
    updateEvaluationsDetail(id, evaluationsDetail) {
        return this.http.put(API_URL + `/evaluation-details/${id}`, evaluationsDetail);
    }
    deleteEvaluationsDetail(id) {
        return this.http.delete(API_URL + `/evaluation-details/${id}`);
    }
};
EvaluationsDetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
EvaluationsDetailService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], EvaluationsDetailService);



/***/ })

}]);
//# sourceMappingURL=evaluations-evaluations-module-es2015.js.map