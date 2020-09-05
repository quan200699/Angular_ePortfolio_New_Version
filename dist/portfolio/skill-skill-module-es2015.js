(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["skill-skill-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/skill/skill-create/skill-create.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/skill/skill-create/skill-create.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Content Header (Page header) -->\r\n<section class=\"content-header\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row mb-2\">\r\n      <div class=\"col-sm-6\">\r\n        <h1>Thêm kỹ năng</h1>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <ol class=\"breadcrumb float-sm-right\">\r\n          <li class=\"breadcrumb-item\"><a routerLink=\"\">Trang chủ</a></li>\r\n          <li class=\"breadcrumb-item active\">Thêm kỹ năng</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div><!-- /.container-fluid -->\r\n</section>\r\n\r\n<!-- Main content -->\r\n<section class=\"content\">\r\n  <form (ngSubmit)=\"createMultiSkill()\">\r\n    <div class=\"card card-primary\">\r\n      <div class=\"card-header\">\r\n        <h3 class=\"card-title\">Thông tin kỹ năng</h3>\r\n\r\n        <div class=\"card-tools\">\r\n          <button type=\"button\" class=\"btn btn-tool\" data-card-widget=\"collapse\" data-toggle=\"tooltip\"\r\n                  title=\"Collapse\">\r\n            <i class=\"fas fa-minus\"></i></button>\r\n        </div>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <div class=\"form-group\">\r\n          <label for=\"data\">Nội dung</label>\r\n          <textarea class=\"form-control\" rows=\"20\" placeholder=\"Paste ...\" id=\"data\" [(ngModel)]=\"data\"\r\n                    name=\"data\"></textarea>\r\n        </div>\r\n      </div>\r\n      <!-- /.card-body -->\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-12\">\r\n        <a routerLink=\"/\" class=\"btn btn-secondary\">Hủy</a>\r\n        <input type=\"submit\" value=\"Tạo mới\" class=\"btn btn-success float-right\">\r\n      </div>\r\n    </div>\r\n  </form>\r\n</section>\r\n<!-- /.content -->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/skill/skill-list/skill-list.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/skill/skill-list/skill-list.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<section class=\"content-header\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row mb-2\">\r\n      <div class=\"col-sm-6\">\r\n        <h1>Danh sách kỹ năng</h1>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <ol class=\"breadcrumb float-sm-right\">\r\n          <li class=\"breadcrumb-item\"><a routerLink=\"/\">Trang chủ</a></li>\r\n          <li class=\"breadcrumb-item active\">Danh sách kỹ năng</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div><!-- /.container-fluid -->\r\n</section>\r\n\r\n<section class=\"content\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      <h3 class=\"card-title\"></h3>\r\n      <div class=\"card-tools\">\r\n        <a routerLink=\"create\" *ngIf=\"hasRoleAdmin\" class=\"btn btn-primary float-lg-right\">\r\n          Tạo mới\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <table class=\"table table-bordered\" id=\"table-skill\">\r\n        <thead>\r\n        <tr>\r\n          <th style=\"width: 10px\">#</th>\r\n          <th>Mã kỹ năng</th>\r\n          <th>Tên kỹ năng</th>\r\n          <th>Tên danh mục</th>\r\n          <th style=\"width: 160px\" *ngIf=\"hasRoleAdmin\"></th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr *ngFor=\"let skill of listSkill; index as i\">\r\n          <td>{{i + 1}}</td>\r\n          <td>{{skill.skillId}}</td>\r\n          <td>{{skill.name}}</td>\r\n          <td>{{skill.category!=null && skill.category.name}}</td>\r\n          <td *ngIf=\"hasRoleAdmin\">\r\n            <div class=\"row\">\r\n              <div class=\"col-6\">\r\n                <a [routerLink]=\"['edit',skill.id]\" class=\"btn btn-block btn-primary\" style=\"color: white\">\r\n                  <i class=\"fas fa-edit\"></i>\r\n                </a>\r\n              </div>\r\n              <div class=\"col-6\">\r\n                <button type=\"button\" class=\"btn btn-block btn-danger\" style=\"color: white\" data-toggle=\"modal\"\r\n                        data-target=\"#modal-delete\" (click)=\"getSkillId(skill.id)\">\r\n                  <i class=\"fas fa-trash\"></i>\r\n                </button>\r\n              </div>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <div class=\"modal fade\" id=\"modal-delete\">\r\n    <div class=\"modal-dialog\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <h4 class=\"modal-title\">Xóa kỹ năng</h4>\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <p>Bạn có chắc muốn xóa kỹ năng này</p>\r\n        </div>\r\n        <div class=\"modal-footer justify-content-between\">\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Đóng</button>\r\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteSkill()\">Xóa</button>\r\n        </div>\r\n      </div>\r\n      <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n  </div>\r\n</section>\r\n");

/***/ }),

/***/ "./src/app/skill/skill-create/skill-create.component.css":
/*!***************************************************************!*\
  !*** ./src/app/skill/skill-create/skill-create.component.css ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NraWxsL3NraWxsLWNyZWF0ZS9za2lsbC1jcmVhdGUuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/skill/skill-create/skill-create.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/skill/skill-create/skill-create.component.ts ***!
  \**************************************************************/
/*! exports provided: SkillCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillCreateComponent", function() { return SkillCreateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_skill_skill_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/skill/skill.service */ "./src/app/service/skill/skill.service.ts");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/notification/notification.service */ "./src/app/service/notification/notification.service.ts");
/* harmony import */ var _service_category_category_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/category/category.service */ "./src/app/service/category/category.service.ts");





let SkillCreateComponent = class SkillCreateComponent {
    constructor(skillService, notificationService, categoryService) {
        this.skillService = skillService;
        this.notificationService = notificationService;
        this.categoryService = categoryService;
        this.data = '';
    }
    ngOnInit() {
    }
    createMultiSkill() {
        let data = this.data;
        let skillRows = [];
        let listSkill;
        let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
        listSkill = data.split('\n');
        for (let skill of listSkill) {
            if (isSkill.test(skill)) {
                skillRows.push(skill);
            }
        }
        let result = skillRows.reduce((createMultiPromise, skillRow) => {
            return createMultiPromise.then(() => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                return yield this.createSkill(skillRow);
            }));
        }, Promise.resolve());
        result.then(() => {
            this.notificationService.showSuccessMessage('Tạo thành công!');
            this.data = '';
        }).catch(() => {
            this.notificationService.showErrorMessage('Tạo thất bại!');
        });
    }
    createSkill(skillRow) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let listCategory = this.getCategoryName();
            let row = skillRow.split('\t');
            const skill = {
                skillId: row[0].trim(),
                name: row[1].trim()
            };
            let regex = /\.$/;
            for (let category of listCategory) {
                const categoryRow = category.split('\t');
                let isCorrect = regex.test(row[0].substring(0, 4));
                let skillId;
                if (row[0].length == 5 || isCorrect) {
                    skillId = row[0].substring(0, 3);
                }
                else if (row[0].length == 6 && !isCorrect) {
                    skillId = row[0].substring(0, 4);
                }
                if (skillId == categoryRow[0]) {
                    skill.category = yield this.getCategoryByName(categoryRow[1].trim());
                    return yield this.skillService.createSkill(skill).toPromise();
                }
            }
        });
    }
    getCategoryByName(name) {
        return this.categoryService.findByCategoryName(name).toPromise();
    }
    getCategoryName() {
        let listCategory;
        let categoryName = [];
        let isSkill = /[1-9].[0-9]{1,2}.[0-9]{1,2}/;
        let isCategory = /[1-9].[0-9]{1,2}/;
        listCategory = this.data.split('\n');
        for (let category of listCategory) {
            if (!isSkill.test(category)) {
                const row = category.trim().split('\t');
                if (row.length == 2 && isCategory.test(row)) {
                    categoryName.push(category);
                }
            }
        }
        return categoryName;
    }
};
SkillCreateComponent.ctorParameters = () => [
    { type: _service_skill_skill_service__WEBPACK_IMPORTED_MODULE_2__["SkillService"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"] },
    { type: _service_category_category_service__WEBPACK_IMPORTED_MODULE_4__["CategoryService"] }
];
SkillCreateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-skill-create',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./skill-create.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/skill/skill-create/skill-create.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./skill-create.component.css */ "./src/app/skill/skill-create/skill-create.component.css")).default]
    })
], SkillCreateComponent);



/***/ }),

/***/ "./src/app/skill/skill-list/skill-list.component.css":
/*!***********************************************************!*\
  !*** ./src/app/skill/skill-list/skill-list.component.css ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NraWxsL3NraWxsLWxpc3Qvc2tpbGwtbGlzdC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/skill/skill-list/skill-list.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/skill/skill-list/skill-list.component.ts ***!
  \**********************************************************/
/*! exports provided: SkillListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillListComponent", function() { return SkillListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/notification/notification.service */ "./src/app/service/notification/notification.service.ts");
/* harmony import */ var _service_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/authentication/authentication.service */ "./src/app/service/authentication/authentication.service.ts");
/* harmony import */ var _service_skill_skill_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/skill/skill.service */ "./src/app/service/skill/skill.service.ts");





let SkillListComponent = class SkillListComponent {
    constructor(skillService, notificationService, authenticationService) {
        this.skillService = skillService;
        this.notificationService = notificationService;
        this.authenticationService = authenticationService;
        this.hasRoleAdmin = false;
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
    getSkillId(id) {
        this.id = id;
    }
    deleteSkill() {
        this.skillService.deleteSkill(this.id).subscribe(() => {
            this.skillService.getAllSkill().subscribe(listSkill => {
                this.listSkill = listSkill;
            });
            $(function () {
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
            $(function () {
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
};
SkillListComponent.ctorParameters = () => [
    { type: _service_skill_skill_service__WEBPACK_IMPORTED_MODULE_4__["SkillService"] },
    { type: _service_notification_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] },
    { type: _service_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }
];
SkillListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-skill-list',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./skill-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/skill/skill-list/skill-list.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./skill-list.component.css */ "./src/app/skill/skill-list/skill-list.component.css")).default]
    })
], SkillListComponent);



/***/ }),

/***/ "./src/app/skill/skill-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/skill/skill-routing.module.ts ***!
  \***********************************************/
/*! exports provided: SkillRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillRoutingModule", function() { return SkillRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _skill_list_skill_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./skill-list/skill-list.component */ "./src/app/skill/skill-list/skill-list.component.ts");
/* harmony import */ var _skill_create_skill_create_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./skill-create/skill-create.component */ "./src/app/skill/skill-create/skill-create.component.ts");





const routes = [
    {
        path: '',
        component: _skill_list_skill_list_component__WEBPACK_IMPORTED_MODULE_3__["SkillListComponent"]
    },
    {
        path: 'create',
        component: _skill_create_skill_create_component__WEBPACK_IMPORTED_MODULE_4__["SkillCreateComponent"]
    }
];
let SkillRoutingModule = class SkillRoutingModule {
};
SkillRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], SkillRoutingModule);



/***/ }),

/***/ "./src/app/skill/skill.module.ts":
/*!***************************************!*\
  !*** ./src/app/skill/skill.module.ts ***!
  \***************************************/
/*! exports provided: SkillModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillModule", function() { return SkillModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _skill_list_skill_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./skill-list/skill-list.component */ "./src/app/skill/skill-list/skill-list.component.ts");
/* harmony import */ var _skill_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./skill-routing.module */ "./src/app/skill/skill-routing.module.ts");
/* harmony import */ var _skill_create_skill_create_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./skill-create/skill-create.component */ "./src/app/skill/skill-create/skill-create.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");







let SkillModule = class SkillModule {
};
SkillModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _skill_list_skill_list_component__WEBPACK_IMPORTED_MODULE_3__["SkillListComponent"],
            _skill_create_skill_create_component__WEBPACK_IMPORTED_MODULE_5__["SkillCreateComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _skill_routing_module__WEBPACK_IMPORTED_MODULE_4__["SkillRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"]
        ]
    })
], SkillModule);



/***/ })

}]);
//# sourceMappingURL=skill-skill-module-es2015.js.map