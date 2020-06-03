import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { IdOublieComponent } from './components/id-oublie/id-oublie.component';
import { MonCompteClientComponent } from './components/mon-compte-client/mon-compte-client.component';
import { MonCompteAdministrateurComponent } from './components/mon-compte-administrateur/mon-compte-administrateur.component';
import { MonCompteFournisseurComponent } from './components/mon-compte-fournisseur/mon-compte-fournisseur.component';
import { MonCompteAjoutAdresseComponent } from './components/mon-compte-ajout-adresse/mon-compte-ajout-adresse.component';
import { MonCompteCrediterComponent } from './components/mon-compte-crediter/mon-compte-crediter.component';
import { MonCompteMajPersoComponent } from './components/mon-compte-maj-perso/mon-compte-maj-perso.component';
import { PageDaccueilComponent } from './components/page-daccueil/page-daccueil.component';
import { SeDeplacerComponent } from './components/se-deplacer/se-deplacer.component';
import { SeDeplacerRechercheComponent } from './components/se-deplacer-recherche/se-deplacer-recherche.component';
import { SeDeplacerTarifComponent } from './components/se-deplacer-tarif/se-deplacer-tarif.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PhotoFinalisationComponent } from './components/photo-finalisation/photo-finalisation.component';
import { PlanReseauComponent } from './components/plan-reseau/plan-reseau.component';
import { MonCompteAdministrateurListeUtilisateurComponent } from './components/mon-compte-administrateur-liste-utilisateur/mon-compte-administrateur-liste-utilisateur.component';
import { MonCompteAdministrateurListeMoyenTransportComponent } from './components/mon-compte-administrateur-liste-moyen-transport/mon-compte-administrateur-liste-moyen-transport.component';
import { MonCompteAdministrateurAjoutUtilisateurComponent } from './components/mon-compte-administrateur-ajout-utilisateur/mon-compte-administrateur-ajout-utilisateur.component';
import { MonCompteAdministrateurAjoutMoyenTransportComponent } from './components/mon-compte-administrateur-ajout-moyen-transport/mon-compte-administrateur-ajout-moyen-transport.component';
import { CreationCompteComponent } from './components/creation-compte/creation-compte.component';
import { MonCompteAdministrateurMajInfoComponent } from './components/mon-compte-administrateur-maj-info/mon-compte-administrateur-maj-info.component';
import { MonCompteAdministrateurInfoComponent } from './components/mon-compte-administrateur-info/mon-compte-administrateur-info.component';
import { MonCompteFournisseurInfoComponent } from './components/mon-compte-fournisseur-info/mon-compte-fournisseur-info.component';
import { MonCompteFournisseurMajInfoComponent } from './components/mon-compte-fournisseur-maj-info/mon-compte-fournisseur-maj-info.component';
import { MonCompteClientMajInfoComponent } from './components/mon-compte-client-maj-info/mon-compte-client-maj-info.component';
import { SeDeplacerReserverSurCarteComponent } from './components/se-deplacer-reserver-sur-carte/se-deplacer-reserver-sur-carte.component';
import { ReservationItineraireComponent } from './components/reservation-itineraire/reservation-itineraire.component';
import { FinDeTrajetComponent } from './components/fin-de-trajet/fin-de-trajet.component';
import { FinalisationComponent } from './components/finalisation/finalisation.component';
import { MonCompteFournisseurTableauDeBordComponent } from './components/mon-compte-fournisseur-tableau-de-bord/mon-compte-fournisseur-tableau-de-bord.component';
import {ChartModule} from 'primeng/chart';
import { MonCompteFournisseurGrapheGainComponent } from './components/mon-compte-fournisseur-tableau-de-bord/mon-compte-fournisseur-graphe-gain/mon-compte-fournisseur-graphe-gain.component';
import { MonCompteFournisseurGrapheRepartitionTransportComponent } from './components/mon-compte-fournisseur-tableau-de-bord/mon-compte-fournisseur-graphe-repartition-transport/mon-compte-fournisseur-graphe-repartition-transport.component';
import { DateCustomPipe } from './pipe/date-custom.pipe';
import { AbsoluPipe } from './pipe/absolu';
import { ReservationSurCarteComponent } from './components/reservation-sur-carte/reservation-sur-carte.component';
import {CardModule, SliderModule} from 'primeng';
import { AccesDeniedComponent } from './components/acces-denied/acces-denied.component';

@NgModule({
  declarations: [
    AppComponent,
	  IdOublieComponent,
    MonCompteClientComponent,
    MonCompteAdministrateurComponent,
    MonCompteFournisseurComponent,
    MonCompteAjoutAdresseComponent,
    MonCompteCrediterComponent,
    MonCompteMajPersoComponent,
    PageDaccueilComponent,
    SeDeplacerComponent,
    SeDeplacerRechercheComponent,
    SeDeplacerTarifComponent,
    LogInComponent,
    PartenairesComponent,
    ContactsComponent,
    PhotoFinalisationComponent,
    PlanReseauComponent,
    PhotoFinalisationComponent,
    MonCompteAdministrateurListeUtilisateurComponent,
    MonCompteAdministrateurListeMoyenTransportComponent,
    MonCompteAdministrateurAjoutUtilisateurComponent,
    MonCompteAdministrateurAjoutMoyenTransportComponent,
    CreationCompteComponent,
    MonCompteAdministrateurMajInfoComponent,
    MonCompteAdministrateurInfoComponent,
    MonCompteFournisseurInfoComponent,
    MonCompteFournisseurMajInfoComponent,
    MonCompteFournisseurInfoComponent,
    MonCompteClientMajInfoComponent,
    SeDeplacerReserverSurCarteComponent,
    MonCompteClientMajInfoComponent,
    ReservationItineraireComponent,
    FinDeTrajetComponent,
    FinalisationComponent,
    MonCompteFournisseurTableauDeBordComponent,
    MonCompteFournisseurGrapheGainComponent,
    MonCompteFournisseurGrapheRepartitionTransportComponent,
    DateCustomPipe,
    AbsoluPipe,
    ReservationSurCarteComponent,
    AccesDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    CardModule,
    SliderModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
