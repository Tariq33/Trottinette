export class Reservation {
  id: number;
  version: number;
  heureDepart: Date;
  heureArrivee: Date;
  date: Date;
  dureeTotale: number;
  montantEstime: number;
  montantTotal: number;
  expiree: boolean;
  adrDepart: AdresseItineraire;
  adrArrivee: AdresseItineraire;
  client: Client;
  finsDeTrajet: Array<FinDeTrajet>;
  itineraires: Array<Itineraire>;


  constructor(id?: number, version?: number, heureDepart?: Date, heureArrivee?: Date, date?: Date, dureeTotale?: number, montantEstime?: number, montantTotal?: number, expiree?: boolean, adrDepart?: AdresseItineraire, adrArrivee?: AdresseItineraire, client?: Client, finsDeTrajet?: Array<FinDeTrajet>, itineraires?: Array<Itineraire>) {
    this.id = id;
    this.version = version;
    this.heureDepart = heureDepart;
    this.heureArrivee = heureArrivee;
    this.date = date;
    this.dureeTotale = dureeTotale;
    this.montantEstime = montantEstime;
    this.montantTotal = montantTotal;
    this.expiree = expiree;
    this.adrDepart = adrDepart;
    this.adrArrivee = adrArrivee;
    this.client = client;
    this.finsDeTrajet = finsDeTrajet;
    this.itineraires = itineraires;
  }
}
