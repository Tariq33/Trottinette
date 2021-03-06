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
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
