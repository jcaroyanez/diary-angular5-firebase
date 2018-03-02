import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router'

import { LoginComponent } from '../component/login/login.component';
import { NoUrlComponent } from '../component/no-url/no-url.component';
import { DashboardComponent } from '../layout/dashboard/dashboard.component';
import { RegisterComponent } from '../component/register/register.component';

export const routes:Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'dashboard',component:DashboardComponent,
    children:[
      {
        path:'',
        loadChildren:'../component/home/home.module#HomeModule'
      },
      {
        path:'categoryMenu',
        loadChildren:'../component/category-menu/category-menu.module#CategoryMenuModule'
      }
  ]},
  {
      path:'**',component:NoUrlComponent
  },  
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class RoutingModule { }
