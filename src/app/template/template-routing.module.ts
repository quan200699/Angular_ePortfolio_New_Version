import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TemplateListComponent} from './template-list/template-list.component';
import {TemplateCreateComponent} from './template-create/template-create.component';
import {TemplateEditComponent} from './template-edit/template-edit.component';
import {TemplateCreateDataComponent} from './template-create-data/template-create-data.component';
import {TemplateInfoComponent} from './template-info/template-info.component';


const routes: Routes = [
  {
    path: '',
    component: TemplateListComponent
  },
  {
    path: 'create',
    component: TemplateCreateComponent
  },
  {
    path: 'edit/:id',
    component: TemplateEditComponent
  },
  {
    path: 'info/:id',
    component: TemplateInfoComponent
  },
  {
    path: 'info/:id/create-data',
    component: TemplateCreateDataComponent
  },
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
