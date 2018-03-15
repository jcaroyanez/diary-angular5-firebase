import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsAddComponent } from '../contacts/contacts-add/contacts-add.component';
import { ContactsMenuRoutingModule } from '../contacts/contacts-routing.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../data-table';
@NgModule({
  imports: [
    CommonModule,
    ContactsMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  declarations: [ContactsAddComponent, ContactsListComponent],
  exports:[ContactsListComponent]
})
export class ContactsModule { }
