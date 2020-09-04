import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutWithSharedComponent} from './layout/layout-with-shared/layout-with-shared.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutWithSharedComponent,
    children: [
      {
        path: 'portfolio',
        loadChildren: () => import('./portfolio/portfolio.module').then(module => module.PortfolioModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('./classes/classes.module').then(module => module.ClassesModule)
      },
      {
        path: 'lectures',
        loadChildren: () => import('./lecture/lecture.module').then(module => module.LectureModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./student/student.module').then(module => module.StudentModule)
      },
      {
        path: 'templates',
        loadChildren: () => import('./template/template.module').then(module => module.TemplateModule)
      },
      {
        path: 'outcomes',
        loadChildren: () => import('./outcome/outcome.module').then(module => module.OutcomeModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./category/category.module').then(module => module.CategoryModule)
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
