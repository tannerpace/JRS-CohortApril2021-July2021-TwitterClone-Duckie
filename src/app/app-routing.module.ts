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
import { ForceLoginGuard } from './guards/force-login.guard';
import { AuthUserGuard } from './guards/auth-user.guard';
import { PreloadQuackGuard } from './guards/preload-quack.guard';
import { ReplyPageComponent } from './components/reply-page/reply-page.component';
import { CreditsComponent } from './components/credits/credits.component';

const routes: Routes = [
  // childern used because it parents the main page to all children
  {path: "login", component: DuckieMainPageComponent, children: [
    {path: "", component: LoginPageComponent}
  ]},
  {path: "", component: DuckieMainPageComponent, canActivate: [ForceLoginGuard], children: [
    {path: "home", component: QuackFeedComponent},
    {path: "compose", component: NewQuackPageComponent},
    {path: "credits", component: CreditsComponent},
    {path: "reply/:id", component: ReplyPageComponent, resolve: {quack: PreloadQuackGuard}},
    {path: "not_found", component: NotFoundComponent}, // make 'notFoundPage'
    {path: ":userName", component: UserPageComponent, resolve: {user: PreloadGuard}, children: [
      {path: "", component: QuackFeedComponent},
      {path: "replies", component: QuackFeedComponent},
      {path: "media", component: QuackFeedComponent},
      {path: "likes", component: QuackFeedComponent}
    ]},
    {path: ":userName/edit", component: EditUserPageComponent, resolve: { user: PreloadGuard}, canActivate: [AuthUserGuard]},
  ]},
  {path: "**", redirectTo: "not_found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
