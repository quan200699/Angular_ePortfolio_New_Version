import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutWithSharedComponent} from './layout/layout-with-shared/layout-with-shared.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutWithSharedComponent,
    children: [
      {
        path: 'portfolio',
        loadChildren: () => import('./portfolio/portfolio.module').then(module => module.PortfolioModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
