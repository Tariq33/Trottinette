import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageDaccueilComponent} from "./components/page-daccueil/page-daccueil.component";
import {SeDeplacerComponent} from "./components/se-deplacer/se-deplacer.component";
import {SeDeplacerTarifComponent} from "./components/se-deplacer-tarif/se-deplacer-tarif.component";
import {PartenairesComponent} from "./components/partenaires/partenaires.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {MonCompteAdministrateurComponent} from './components/mon-compte-administrateur/mon-compte-administrateur.component';
import {LogInComponent} from "./components/log-in/log-in.component";
import {MonCompteClientComponent} from "./components/mon-compte-client/mon-compte-client.component";


const routes: Routes = [
  {path: "", component: PageDaccueilComponent},
  {path: "accueil", component: PageDaccueilComponent},
  {path: "seDeplacer", component: SeDeplacerComponent},
  {path: "tarifs", component: SeDeplacerTarifComponent},
  {path: "partenaires", component: PartenairesComponent},
  {path: "contact", component: ContactsComponent},
  {path: "compteAdministrateur", component: MonCompteAdministrateurComponent},
  {path: "compteClient", component: MonCompteClientComponent},
  {path: "logIn", component: LogInComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
