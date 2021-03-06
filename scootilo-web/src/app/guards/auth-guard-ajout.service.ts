import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {SessionService} from "../service/session.service";
import {Utilisateur} from "../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAjoutService implements CanActivate{

  utilisateur: Utilisateur;

  constructor(public sessionService : SessionService) {
    this.utilisateur=this.sessionService.getUtilisateur();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.utilisateur.type == "customer" || this.utilisateur.type == null)  {
      // alert('Vous n\'avez pas le droit d\'acceder à cette page');
      // location.replace('/accueil');
      location.replace('/accessDenied');
      return false;
    }
    return true;
  }




}
