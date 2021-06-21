import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DuckieMainPageComponent } from './components/duckie-main-page/duckie-main-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';
import { NewQuackFormComponent } from './components/new-quack-form/new-quack-form.component';
import { QuackFeedComponent } from './components/quack-feed/quack-feed.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NewQuackPageComponent } from './components/new-quack-page/new-quack-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DuckieMainPageComponent,
    UserPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    EditUserFormComponent,
    NewQuackFormComponent,
    QuackFeedComponent,
 

    NavBarComponent,
    NewQuackPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
