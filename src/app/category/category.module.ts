import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule
  ]
})
export class CategoryModule { }
