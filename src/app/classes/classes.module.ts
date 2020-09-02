import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassesRoutingModule} from './classes-routing.module';
import {ClassesListComponent} from './classes-list/classes-list.component';
import {CreateClassComponent} from './create-class/create-class.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ClassesListComponent,
    CreateClassComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    FormsModule
  ]
})
export class ClassesModule {
}
