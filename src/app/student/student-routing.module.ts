import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentInfoComponent} from './student-info/student-info.component';


const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'info/:id',
    component: StudentInfoComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
