import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';


import { NoUrlComponent } from './component/no-url/no-url.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CategoryMenuModule } from './component/category-menu/category-menu.module';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';
import { CONFIG_FIREBASE } from './services/const-util';
import { MenuCategoryService } from './services/menu-category.service';
import { RegisterComponent } from './component/register/register.component';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoUrlComponent,
    FooterComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    APP_DIRECTIVES,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    CategoryMenuModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(CONFIG_FIREBASE),
    AngularFireDatabaseModule
  ],
  providers: [
    MenuCategoryService,
    UsersService,
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
