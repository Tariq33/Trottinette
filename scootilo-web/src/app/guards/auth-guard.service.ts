import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {SessionService} from "../service/session.service";
import {Utilisateur} from "../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  utilisateur: Utilisateur;

  constructor(public sessionService : SessionService) {
    this.utilisateur=this.sessionService.getUtilisateur();
    console.log(this.utilisateur);
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {


    console.log(this.utilisateur);
    if (this.utilisateur.type != "admin")  {
      alert('You are not allowed to view this page');
        location.replace('/accueil');
        return false;
    }
    return true;
  }
  
}
