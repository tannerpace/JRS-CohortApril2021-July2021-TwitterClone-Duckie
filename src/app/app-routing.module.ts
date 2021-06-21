import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuckieMainPageComponent } from './components/duckie-main-page/duckie-main-page.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { NewQuackPageComponent } from './components/new-quack-page/new-quack-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  {path: "", component: DuckieMainPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "user", component: UserPageComponent},
  {path: "compose", component: NewQuackPageComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
