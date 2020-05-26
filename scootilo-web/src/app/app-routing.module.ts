import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageDaccueilComponent} from "./components/page-daccueil/page-daccueil.component";
import {SeDeplacerComponent} from "./components/se-deplacer/se-deplacer.component";
import {SeDeplacerTarifComponent} from "./components/se-deplacer-tarif/se-deplacer-tarif.component";
import {PartenairesComponent} from "./components/partenaires/partenaires.component";
import {ContactsComponent} from "./components/contacts/contacts.component";


const routes: Routes = [
  {path: "", component: PageDaccueilComponent},
  {path: "accueil", component: PageDaccueilComponent},
  {path: "seDeplacer", component: SeDeplacerComponent},
  {path: "tarifs", component: SeDeplacerTarifComponent},
  {path: "partenaires", component: PartenairesComponent},
  {path: "contact", component: ContactsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
