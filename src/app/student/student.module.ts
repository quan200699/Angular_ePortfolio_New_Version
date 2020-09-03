import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentInfoComponent} from './student-info/student-info.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    StudentListComponent,
    StudentInfoComponent
  ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        FormsModule
    ]
})
export class StudentModule { }
