import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EvaluationsRoutingModule} from './evaluations-routing.module';
import {EvaluationsInfoComponent} from './evaluations-info/evaluations-info.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    EvaluationsInfoComponent,
  ],
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
    FormsModule
  ]
})
export class EvaluationsModule { }
