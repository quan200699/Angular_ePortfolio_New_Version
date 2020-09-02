import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LectureRoutingModule} from './lecture-routing.module';
import {LectureCreateComponent} from './lecture-create/lecture-create.component';
import {FormsModule} from '@angular/forms';
import {LectureListComponent} from './lecture-list/lecture-list.component';


@NgModule({
  declarations: [
    LectureListComponent,
    LectureCreateComponent
  ],
  imports: [
    CommonModule,
    LectureRoutingModule,
    FormsModule,
  ]
})
export class LectureModule {
}
