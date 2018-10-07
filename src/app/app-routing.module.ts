import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from "./index/index.component";
import { DisplayComponent } from "./display/display.component";

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent },
  // { path: 'face-list', component: FaceListComponent },
  { path: 'display', component: DisplayComponent },
  // { path: 'search-pro', component: SearchProComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
