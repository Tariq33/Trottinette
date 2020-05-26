import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageDaccueilComponent} from "./components/page-daccueil/page-daccueil.component";


const routes: Routes = [{path: "", component: PageDaccueilComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
