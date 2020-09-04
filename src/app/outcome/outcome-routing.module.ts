import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OutcomeListComponent} from './outcome-list/outcome-list.component';


const routes: Routes = [
  {
    path: '',
    component: OutcomeListComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OutcomeRoutingModule { }
