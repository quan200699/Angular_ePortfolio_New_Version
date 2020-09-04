import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillListComponent} from './skill-list/skill-list.component';
import {SkillRoutingModule} from './skill-routing.module';



@NgModule({
  declarations: [
    SkillListComponent,
  ],
  imports: [
    CommonModule,
    SkillRoutingModule
  ]
})
export class SkillModule { }
