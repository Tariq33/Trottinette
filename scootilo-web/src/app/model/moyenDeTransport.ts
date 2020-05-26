import {TypeDeTransport} from "./typeDeTransport";
import {TypeMoteur} from "./typeMoteur";
import {Fournisseur} from "./fournisseur";
import {Itineraire} from "./itineraire";

export class MoyenDeTransport{
  id: number;
  version: number;
  longitude: number;
  latitude: number;
  typeDeTransport: TypeDeTransport;
  distanceEstimee: number;
  typeMoteur: TypeMoteur;
  capacite: number;
  prixMinute: number;
  numeroDeSerie: string;
  qrCode: string;
  disponible: boolean;
  enUtilisation: boolean;
  fournisseur: Fournisseur;
  itineraire: Itineraire;

  constructor(id?: number, version?: number, longitude?: number, latitude?: number, typeDeTransport?: TypeDeTransport, distanceEstimee?: number, typeMoteur?: TypeMoteur, capacite?: number, prixMinute?: number, numeroDeSerie?: string, qrCode?: string, disponible?: boolean, enUtilisation?: boolean, fournisseur?: Fournisseur, itineraire?: Itineraire) {
    this.id=id;
    this.version = version;
    this.longitude = longitude;
    this.latitude = latitude;
    this.typeDeTransport = typeDeTransport
    this.distanceEstimee = distanceEstimee;
    this.typeMoteur = typeMoteur;
    this.capacite = capacite;
    this.prixMinute = prixMinute;
    this.numeroDeSerie = numeroDeSerie;
    this.qrCode = qrCode;
    this.disponible = disponible;
    this.enUtilisation = enUtilisation;
    this.fournisseur = fournisseur;
    this.itineraire = itineraire;
  }

}
