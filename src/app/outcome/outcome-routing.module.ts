import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OutcomeListComponent} from './outcome-list/outcome-list.component';
import {OutcomeCreateComponent} from './outcome-create/outcome-create.component';


const routes: Routes = [
  {
    path: '',
    component: OutcomeListComponent
  },
  {
    path: 'create',
    component: OutcomeCreateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OutcomeRoutingModule {
}
