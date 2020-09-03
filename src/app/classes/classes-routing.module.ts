import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassesListComponent} from './classes-list/classes-list.component';
import {CreateClassComponent} from './create-class/create-class.component';
import {EditClassComponent} from './edit-class/edit-class.component';
import {ClassesInfoComponent} from './classes-info/classes-info.component';


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
  }
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
