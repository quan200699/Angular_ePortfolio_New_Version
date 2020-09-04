import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OutcomeRoutingModule} from './outcome-routing.module';
import {OutcomeListComponent} from './outcome-list/outcome-list.component';



@NgModule({
  declarations: [
    OutcomeListComponent
  ],
  imports: [
    CommonModule,
    OutcomeRoutingModule
  ]
})
export class OutcomeModule { }
