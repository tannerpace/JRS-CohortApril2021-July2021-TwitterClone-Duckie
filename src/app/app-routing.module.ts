import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuckieMainPageComponent } from './components/duckie-main-page/duckie-main-page.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { NewQuackPageComponent } from './components/compose/new-quack-page/new-quack-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { PreloadGuard } from './guards/preload.guard';
import { EditUserPageComponent } from './components/edit-user/edit-user-page/edit-user-page.component';
import { QuackFeedComponent } from './components/quack-feed/quack-feed.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  // childern used because it parents the main page to all children
  {path: "", component: DuckieMainPageComponent, children: [
    {path: "home", component: QuackFeedComponent},
    {path: "compose", component: NewQuackPageComponent},
    {path: "not_found", component: NotFoundComponent}, // make 'notFoundPage'
    {path: ":username", component: UserPageComponent, resolve: [PreloadGuard]},
    {path: ":username/edit", component: EditUserPageComponent},
  ]},
  {path: "login", component: LoginPageComponent},
  {path: "**", redirectTo: "not_found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
