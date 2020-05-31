import {Utilisateur} from "./utilisateur";
import {Adresse} from "./adresse";
import {Pref} from "./preference2";
import {Reservation} from "./Reservation";
import {Transaction} from "./Transaction";

export class Client extends Utilisateur {
  solde: number;
  prenom: string;
  adresse: Array<Adresse>;
  preference: Pref;
  reservations: Array<Reservation>;
  transactions: Array<Transaction>;
  type : string;
  latitude: number;
  longitude: number;


  constructor(solde?: number, type?:string, prenom?: string, adresse?: Array<Adresse>, preference?: Pref, reservations?: Array<Reservation>, transactions?: Array<Transaction>, latitude?: number, longitude?:number) {
    super();
    this.solde = solde
    this.prenom = prenom;
    this.adresse = adresse;
    this.preference = preference;
    this.reservations = reservations;
    this.transactions = transactions;
    this.type="customer";
    this.latitude = latitude;
    this.longitude = longitude;
  }

}
