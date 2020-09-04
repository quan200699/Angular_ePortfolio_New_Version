import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TemplateListComponent} from './template-list/template-list.component';
import {TemplateCreateComponent} from './template-create/template-create.component';


const routes: Routes = [
  {
    path: '',
    component: TemplateListComponent
  },
  {
    path: 'create',
    component: TemplateCreateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TemplateRoutingModule {
}
