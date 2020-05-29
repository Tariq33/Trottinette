import {Utilisateur} from "./utilisateur";

export class Adresse {
  id: number;
  version: number;
  nomAdresse:string;
  rue: string;
  complement: string;
  codePostal: string;
  ville: string;
  utilisateur:Utilisateur;

  constructor(utilisateur?:Utilisateur, id?:number, version?:number, nomAdresse?:string, rue?: string, complement?: string, codePostal?: string, ville?: string) {
    this.id = id;
    this.version = version;
    this.rue = rue;
    this.complement = complement;
    this.codePostal = codePostal;
    this.ville = ville;
    this.nomAdresse=nomAdresse;
    this.utilisateur=utilisateur;

  }
}
