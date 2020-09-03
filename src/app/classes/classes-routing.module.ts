import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassesListComponent} from './classes-list/classes-list.component';
import {CreateClassComponent} from './create-class/create-class.component';
import {EditClassComponent} from './edit-class/edit-class.component';
import {ClassesInfoComponent} from './classes-info/classes-info.component';
import {ClassesAddStudentComponent} from './classes-add-student/classes-add-student.component';


const routes: Routes = [
  {
    path: '',
    component: ClassesListComponent
  },
  {
    path: 'create',
    component: CreateClassComponent
  },
  {
    path: 'edit/:id',
    component: EditClassComponent
  },
  {
    path: 'info/:id',
    component: ClassesInfoComponent
  },
  {
    path: 'info/:id/create',
    component: ClassesAddStudentComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClassesRoutingModule {
}
