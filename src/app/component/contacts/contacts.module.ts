import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsAddComponent } from '../contacts/contacts-add/contacts-add.component';
import { ContactsMenuRoutingModule } from '../contacts/contacts-routing.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ContactsMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ContactsAddComponent, ContactsListComponent]
})
export class ContactsModule { }
