export class Pref{
  velo: boolean;
  scooter: boolean;
  trottinette: boolean;
  rapide: boolean;
  moinsCher: boolean;
  moinsDeMarche: boolean;


  constructor(velo?: boolean, scooter?: boolean, trottinette?: boolean, rapide?: boolean, moinsCher?: boolean, moinsDeMarche?: boolean) {
    this.velo = velo;
    this.scooter = scooter;
    this.trottinette = trottinette;
    this.rapide = rapide;
    this.moinsCher = moinsCher;
    this.moinsDeMarche = moinsDeMarche;
  }
}
