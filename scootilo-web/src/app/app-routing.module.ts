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
import {ReservationItineraireComponent} from "./components/reservation-itineraire/reservation-itineraire.component";
import {FinDeTrajetComponent} from "./components/fin-de-trajet/fin-de-trajet.component";
import {FinalisationComponent} from "./components/finalisation/finalisation.component";
import {MonCompteAjoutAdresseComponent} from "./components/mon-compte-ajout-adresse/mon-compte-ajout-adresse.component";
import {IdOublieComponent} from "./components/id-oublie/id-oublie.component";
import {MonCompteFournisseurTableauDeBordComponent} from './components/mon-compte-fournisseur-tableau-de-bord/mon-compte-fournisseur-tableau-de-bord.component';
import {ReservationSurCarteComponent} from './components/reservation-sur-carte/reservation-sur-carte.component';
import {AuthGuardAdminService} from "./guards/auth-guard-admin.service";
import {AuthGuardSupplierService} from "./guards/auth-guard-supplier.service";
import {AuthGuardCustomerService} from "./guards/auth-guard-customer.service";
import {AuthGuardConnecterService} from "./guards/auth-guard-connecter.service";
import {AccesDeniedComponent} from "./components/acces-denied/acces-denied.component";
import {AuthGuardAjoutService} from "./guards/auth-guard-ajout.service";


const routes: Routes = [
  {path: "", component: PageDaccueilComponent},
  {path: "accueil", component: FinalisationComponent},
  {path: "seDeplacer", component: SeDeplacerComponent},
  {path: "tarifs", component: SeDeplacerTarifComponent},
  {path: "partenaires", component: PartenairesComponent},
  {path: "contact", component: ContactsComponent},
  {path: "compteAdministrateur", component: MonCompteAdministrateurComponent, canActivate: [AuthGuardAdminService]},
  {path: "logIn", component: LogInComponent},
  {path: "plan", component: PlanReseauComponent},
  {path: "compteAdministrateur/ajoutUtilisateur", component: MonCompteAdministrateurAjoutUtilisateurComponent, canActivate: [AuthGuardAdminService]},
  {path: "compteAdministrateur/ajoutUtilisateur/:id", component: MonCompteAdministrateurAjoutUtilisateurComponent, canActivate: [AuthGuardAdminService]},
  {path: "compteAdministrateur/ajoutMoyenTransport", component: MonCompteAdministrateurAjoutMoyenTransportComponent, canActivate: [AuthGuardAjoutService]},
  {path: "compteAdministrateur/ajoutMoyenTransport/:id", component: MonCompteAdministrateurAjoutMoyenTransportComponent, canActivate: [AuthGuardAjoutService]},
  {path: "compteAdministrateur/miseJourInfoPerso", component: MonCompteAdministrateurMajInfoComponent, canActivate: [AuthGuardAdminService]},
  {path: "compteFournisseur", component: MonCompteFournisseurComponent, canActivate: [AuthGuardSupplierService]},
  {path: "compteFournisseur/miseJourInfoPerso/:id", component: MonCompteFournisseurMajInfoComponent, canActivate: [AuthGuardSupplierService]},
  {path: "compteClient", component: MonCompteClientComponent, canActivate: [AuthGuardCustomerService]},
  {path: "creationCompte", component: CreationCompteComponent},
  {path: "compteCrediter", component: MonCompteCrediterComponent, canActivate: [AuthGuardCustomerService]},
  {path: "seDeplacerrecherche", component: SeDeplacerRechercheComponent},
  {path: "compteCrediter/:id", component: MonCompteCrediterComponent, canActivate: [AuthGuardCustomerService]},
  {path: "compteClient/miseJourInfoPerso", component: MonCompteClientMajInfoComponent, canActivate: [AuthGuardCustomerService]},
  {path: "reservationItineraire", component: ReservationItineraireComponent, canActivate: [AuthGuardCustomerService]},
  {path: "reservationSurCarte", component: ReservationSurCarteComponent, canActivate: [AuthGuardCustomerService]},
  {path: "finDeTrajet/:id", component: FinDeTrajetComponent, canActivate: [AuthGuardConnecterService]},
  {path: "compteFournisseur/tableauDeBord", component: MonCompteFournisseurTableauDeBordComponent, canActivate: [AuthGuardSupplierService]},
  {path: "finalisation", component: FinalisationComponent, canActivate: [AuthGuardConnecterService]},
  {path: "compteClient/ajoutAdresse/:id", component: MonCompteAjoutAdresseComponent, canActivate: [AuthGuardCustomerService]},
  {path: "idOublie", component: IdOublieComponent},
  {path: "accessDenied", component: AccesDeniedComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
