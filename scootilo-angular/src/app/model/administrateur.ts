import {Utilisateur} from "./utilisateur";

export class Administrateur extends Utilisateur {
  prenom: string;


  constructor(prenom?: string) {
    super();
    this.prenom = prenom;

  }

}
