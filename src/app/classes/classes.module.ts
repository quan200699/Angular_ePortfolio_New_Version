import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassesRoutingModule} from './classes-routing.module';
import {ClassesListComponent} from './classes-list/classes-list.component';
import {CreateClassComponent} from './create-class/create-class.component';
import {FormsModule} from '@angular/forms';
import {EditClassComponent} from './edit-class/edit-class.component';


@NgModule({
  declarations: [
    ClassesListComponent,
    CreateClassComponent,
    EditClassComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    FormsModule
  ]
})
export class ClassesModule {
}
