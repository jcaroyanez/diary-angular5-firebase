import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ContactsAddComponent } from '../contacts/contacts-add/contacts-add.component';
import { ContactsListComponent } from '../contacts/contacts-list/contacts-list.component';

export const routes:Routes = [
  {
    path:'',children:[
      {
        path:'add',
        component:ContactsAddComponent
      },
      {
        path:'list',
        component:ContactsListComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class ContactsMenuRoutingModule { }
