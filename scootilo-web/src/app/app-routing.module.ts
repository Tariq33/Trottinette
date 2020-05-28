import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageDaccueilComponent} from "./components/page-daccueil/page-daccueil.component";
import {SeDeplacerComponent} from "./components/se-deplacer/se-deplacer.component";
import {SeDeplacerTarifComponent} from "./components/se-deplacer-tarif/se-deplacer-tarif.component";
import {PartenairesComponent} from "./components/partenaires/partenaires.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {MonCompteAdministrateurComponent} from './components/mon-compte-administrateur/mon-compte-administrateur.component';
import {LogInComponent} from "./components/log-in/log-in.component";
import {PlanReseauComponent} from "./components/plan-reseau/plan-reseau.component";
import {MonCompteAdministrateurAjoutUtilisateurComponent} from './components/mon-compte-administrateur-ajout-utilisateur/mon-compte-administrateur-ajout-utilisateur.component';
import {MonCompteAdministrateurAjoutMoyenTransportComponent} from './components/mon-compte-administrateur-ajout-moyen-transport/mon-compte-administrateur-ajout-moyen-transport.component';
import {CreationCompteComponent} from "./components/creation-compte/creation-compte.component";
import {MonCompteAdministrateurMajInfoComponent} from './components/mon-compte-administrateur-maj-info/mon-compte-administrateur-maj-info.component';
import {MonCompteFournisseurComponent} from './components/mon-compte-fournisseur/mon-compte-fournisseur.component';
import {MonCompteFournisseurMajInfoComponent} from './components/mon-compte-fournisseur-maj-info/mon-compte-fournisseur-maj-info.component';
import {MonCompteClientComponent} from './components/mon-compte-client/mon-compte-client.component';
import {MonCompteCrediterComponent} from "./components/mon-compte-crediter/mon-compte-crediter.component";
import {MonCompteClientMajInfoComponent} from "./components/mon-compte-client-maj-info/mon-compte-client-maj-info.component";
import {SeDeplacerRechercheComponent} from "./components/se-deplacer-recherche/se-deplacer-recherche.component";


const routes: Routes = [
  {path: "", component: PageDaccueilComponent},
  {path: "accueil", component: PageDaccueilComponent},
  {path: "seDeplacer", component: SeDeplacerComponent},
  {path: "tarifs", component: SeDeplacerTarifComponent},
  {path: "partenaires", component: PartenairesComponent},
  {path: "contact", component: ContactsComponent},
  {path: "compteAdministrateur", component: MonCompteAdministrateurComponent},
  {path: "logIn", component: LogInComponent},
  {path: "plan", component: PlanReseauComponent},
  {path: "compteAdministrateur/ajoutUtilisateur", component: MonCompteAdministrateurAjoutUtilisateurComponent},
  {path: "compteAdministrateur/ajoutUtilisateur/:id", component: MonCompteAdministrateurAjoutUtilisateurComponent},
  {path: "compteAdministrateur/ajoutMoyenTransport", component: MonCompteAdministrateurAjoutMoyenTransportComponent },
  {path: "compteAdministrateur/ajoutMoyenTransport/:id", component: MonCompteAdministrateurAjoutMoyenTransportComponent },
  {path: "compteAdministrateur/miseJourInfoPerso/:id", component: MonCompteAdministrateurMajInfoComponent },
  {path: "compteFournisseur", component: MonCompteFournisseurComponent},
  {path: "compteFournisseur/miseJourInfoPerso/:id", component: MonCompteFournisseurMajInfoComponent },
  {path: "compteClient", component: MonCompteClientComponent},
  {path: "creationCompte", component: CreationCompteComponent},
  {path: "compteCrediter", component: MonCompteCrediterComponent},
  {path: "seDeplacerrecherche", component: SeDeplacerRechercheComponent},
  {path: "compteCrediter/:id", component: MonCompteCrediterComponent},
  {path: "compteClient/miseJourInfoPerso", component: MonCompteClientMajInfoComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
