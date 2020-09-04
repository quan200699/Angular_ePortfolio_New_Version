import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OutcomeRoutingModule} from './outcome-routing.module';
import {OutcomeListComponent} from './outcome-list/outcome-list.component';
import {OutcomeCreateComponent} from './outcome-create/outcome-create.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    OutcomeListComponent,
    OutcomeCreateComponent,
  ],
  imports: [
    CommonModule,
    OutcomeRoutingModule,
    FormsModule
  ]
})
export class OutcomeModule { }
