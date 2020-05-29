import {Utilisateur} from "./utilisateur";
import {Adresse} from "./adresse";
import {FinDeTrajet} from "./finDeTrajet";
import {PaiementFournisseur} from "./PaiementFournisseur";
import {MoyenDeTransport} from "./moyenDeTransport";

export class Fournisseur extends Utilisateur {
  numeroSiret: string;
  numeroTva: string;
  iban: string;
  bic: string;
  adresse: Array<Adresse>;
  paiements: Array<PaiementFournisseur>;
  moyensDeTransport: Array<MoyenDeTransport>;


  constructor(numeroSiret?: string,numeroTva?: string, iban?: string, bic?: string, adresse?: Array<Adresse>, paiements?: Array<PaiementFournisseur>, moyensDeTransport?: Array<MoyenDeTransport>) {
    super();
    this.numeroSiret = numeroSiret
    this.numeroTva = numeroTva;
    this.iban = iban;
    this.bic = bic;
    this.adresse = adresse;
    this.paiements = paiements;
    this.moyensDeTransport = moyensDeTransport;
  }

}
