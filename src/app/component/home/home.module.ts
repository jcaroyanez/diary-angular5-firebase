import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ContactsModule } from '../contacts/contacts.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ContactsModule
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
