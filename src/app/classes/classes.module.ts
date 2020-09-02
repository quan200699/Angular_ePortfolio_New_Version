import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassesRoutingModule} from './classes-routing.module';
import {ClassesListComponent} from './classes-list/classes-list.component';


@NgModule({
  declarations: [
    ClassesListComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule
  ]
})
export class ClassesModule {
}
