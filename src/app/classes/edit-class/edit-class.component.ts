import {Component, OnInit} from '@angular/core';
import {Classes} from '../../interface/classes';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ClassesService} from '../../service/classes/classes.service';
import {NotificationService} from '../../service/notification/notification.service';
import {LectureService} from '../../service/lecture/lecture.service';
import {Lecture} from '../../interface/lecture';
import {Module} from '../../interface/module';
import {Program} from '../../interface/program';
import {ProgramService} from '../../service/program/program.service';
import {ModuleService} from '../../service/module/module.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  classes: Classes = {};
  listLecture: Lecture[] = [];
  id: number;
  listModule: Module[] = [];
  listProgram: Program[] = [];
  program: Program = {
    id: -1,
    name: ''
  };

  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private classesService: ClassesService,
              private lectureService: LectureService,
              private programService: ProgramService,
              private moduleService: ModuleService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.classes = await this.getClasses(this.id);
      if (this.classes.lecture == null) {
        this.classes.lecture = {
          id: -1
        };
      }
      if (this.classes.module == null) {
        this.classes.module = {
          id: -1
        };
      }
    });
    this.getAllLecture();
    this.getAllProgram();
  }

  getClasses(id: number) {
    return this.classesService.getClasses(id).toPromise();
  }

  updateClasses(id: number) {
    this.classesService.updateClasses(id, this.classes).subscribe(() => {
      this.notificationService.showSuccessMessage('Cập nhật thành công!');
    }, () => {
      this.notificationService.showErrorMessage('Cập nhật thất bại!');
    });
  }

  getAllLecture() {
    this.lectureService.getAllLecture().subscribe(listLecture => {
      this.listLecture = listLecture;
    });
  }

  getAllProgram() {
    this.programService.getAllProgram().subscribe(listProgram => {
      this.listProgram = listProgram;
    });
  }

  getAllModuleByProgram(programId) {
    this.moduleService.getAllModuleByProgram(programId).subscribe(listModule => {
      this.listModule = listModule;
    });
  }
}
