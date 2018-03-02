import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMenuListComponent } from './category-menu-list/category-menu-list.component';
import { CategoryMenuAddComponent } from './category-menu-add/category-menu-add.component';
import { CategoryMenuRoutingModule } from './category-menu-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';
import { DataTableModule } from '../data-table';

@NgModule({
  imports: [
    CommonModule,
    CategoryMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  declarations: [
    CategoryMenuAddComponent,
    CategoryMenuListComponent
  ]
})
export class CategoryMenuModule { }
