import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { CategoryMenuListComponent } from './category-menu-list/category-menu-list.component';
import { CategoryMenuAddComponent } from './category-menu-add/category-menu-add.component';

export const routes:Routes = [
  {path:'',
  children:[
    {
      path:'list',
      component:CategoryMenuListComponent
    },
    {
      path:'add',
      component:CategoryMenuAddComponent
    }
  ]}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class CategoryMenuRoutingModule { }
