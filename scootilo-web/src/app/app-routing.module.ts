import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageDaccueilComponent} from "./components/page-daccueil/page-daccueil.component";
import {SeDeplacerComponent} from "./components/se-deplacer/se-deplacer.component";
import {SeDeplacerTarifComponent} from "./components/se-deplacer-tarif/se-deplacer-tarif.component";
import {PartenairesComponent} from "./components/partenaires/partenaires.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {MonCompteAdministrateurComponent} from './components/mon-compte-administrateur/mon-compte-administrateur.component';
import {LogInComponent} from "./components/log-in/log-in.component";
import {MonCompteAdministrateurAjoutUtilisateurComponent} from './components/mon-compte-administrateur-ajout-utilisateur/mon-compte-administrateur-ajout-utilisateur.component';
import {MonCompteAdministrateurAjoutMoyenTransportComponent} from './components/mon-compte-administrateur-ajout-moyen-transport/mon-compte-administrateur-ajout-moyen-transport.component';
import {CreationCompteComponent} from "./components/creation-compte/creation-compte.component";


const routes: Routes = [
  {path: "", component: PageDaccueilComponent},
  {path: "accueil", component: PageDaccueilComponent},
  {path: "seDeplacer", component: SeDeplacerComponent},
  {path: "tarifs", component: SeDeplacerTarifComponent},
  {path: "partenaires", component: PartenairesComponent},
  {path: "contact", component: ContactsComponent},
  {path: "compteAdministrateur", component: MonCompteAdministrateurComponent},
  {path: "logIn", component: LogInComponent},
  {path: "compteAdministrateur/ajoutUtilisateur", component: MonCompteAdministrateurAjoutUtilisateurComponent},
  {path: "compteAdministrateur/ajoutUtilisateur/:id", component: MonCompteAdministrateurAjoutUtilisateurComponent},
  {path: "compteAdministrateur/ajoutMoyenTransport", component: MonCompteAdministrateurAjoutMoyenTransportComponent },
  {path: "compteAdministrateur/ajoutMoyenTransport/:id", component: MonCompteAdministrateurAjoutMoyenTransportComponent }
  {path: "creationCompte", component: CreationCompteComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
