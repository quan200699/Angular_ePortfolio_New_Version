import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TemplateRoutingModule} from './template-routing.module';
import {TemplateListComponent} from './template-list/template-list.component';
import {TemplateCreateComponent} from './template-create/template-create.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    TemplateListComponent,
    TemplateCreateComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FormsModule
  ]
})
export class TemplateModule { }
