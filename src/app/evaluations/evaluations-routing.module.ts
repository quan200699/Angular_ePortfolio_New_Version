import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationsInfoComponent} from './evaluations-info/evaluations-info.component';


const routes: Routes = [
  {
    path: 'info/:id',
    component: EvaluationsInfoComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
