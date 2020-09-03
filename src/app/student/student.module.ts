import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentInfoComponent} from './student-info/student-info.component';



@NgModule({
  declarations: [
    StudentListComponent,
    StudentInfoComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
