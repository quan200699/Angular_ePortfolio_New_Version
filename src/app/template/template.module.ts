import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TemplateRoutingModule} from './template-routing.module';
import {TemplateListComponent} from './template-list/template-list.component';
import {TemplateCreateComponent} from './template-create/template-create.component';
import {FormsModule} from '@angular/forms';
import {TemplateEditComponent} from './template-edit/template-edit.component';
import {TemplateInfoComponent} from './template-info/template-info.component';
import {TemplateCreateDataComponent} from './template-create-data/template-create-data.component';



@NgModule({
  declarations: [
    TemplateListComponent,
    TemplateCreateComponent,
    TemplateEditComponent,
    TemplateInfoComponent,
    TemplateCreateDataComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FormsModule
  ]
})
export class TemplateModule { }
