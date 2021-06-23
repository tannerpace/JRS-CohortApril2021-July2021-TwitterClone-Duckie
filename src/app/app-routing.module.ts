import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuckieMainPageComponent } from './components/duckie-main-page/duckie-main-page.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { NewQuackPageComponent } from './components/compose/new-quack-page/new-quack-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { PreloadGuard } from './guards/preload.guard';
import { EditUserPageComponent } from './components/edit-user/edit-user-page/edit-user-page.component';

const routes: Routes = [
  {path: "", component: DuckieMainPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "compose", component: NewQuackPageComponent},
  {path: "user_not_found", component: UserPageComponent}, // make 'notFoundPage'
  {path: "user/:username", component: UserPageComponent, resolve: [PreloadGuard]},
  {path: "user/:username/edit", component: EditUserPageComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
