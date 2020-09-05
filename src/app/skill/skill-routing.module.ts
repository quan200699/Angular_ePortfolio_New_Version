import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkillListComponent} from './skill-list/skill-list.component';
import {SkillCreateComponent} from './skill-create/skill-create.component';


const routes: Routes = [
  {
    path: '',
    component: SkillListComponent
  },
  {
    path: 'create',
    component: SkillCreateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SkillRoutingModule {
}
