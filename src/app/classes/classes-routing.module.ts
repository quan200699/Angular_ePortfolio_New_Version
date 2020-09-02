import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassesListComponent} from './classes-list/classes-list.component';
import {CreateClassComponent} from './create-class/create-class.component';


const routes: Routes = [
  {
    path: '',
    component: ClassesListComponent
  },
  {
    path: 'create',
    component: CreateClassComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
