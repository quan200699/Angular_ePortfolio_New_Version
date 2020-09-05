import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillListComponent} from './skill-list/skill-list.component';
import {SkillRoutingModule} from './skill-routing.module';
import {SkillCreateComponent} from './skill-create/skill-create.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    SkillListComponent,
    SkillCreateComponent
  ],
  imports: [
    CommonModule,
    SkillRoutingModule,
    FormsModule
  ]
})
export class SkillModule { }
