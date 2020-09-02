import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LectureCreateComponent} from './lecture-create/lecture-create.component';
import {LectureListComponent} from './lecture-list/lecture-list.component';


const routes: Routes = [
  {
    path: '',
    component: LectureListComponent
  },
  {
    path: 'create',
    component: LectureCreateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LectureRoutingModule {
}
