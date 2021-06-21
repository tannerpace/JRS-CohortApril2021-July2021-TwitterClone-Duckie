import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuckieMainPageComponent } from './components/duckie-main-page/duckie-main-page.component';

const routes: Routes = [
  {path: "", component: DuckieMainPageComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
