import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {SessionService} from "../service/session.service";
import {Utilisateur} from "../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSupplierService implements CanActivate{

  utilisateur: Utilisateur;

  constructor(public sessionService : SessionService) {
    this.utilisateur=this.sessionService.getUtilisateur();
    console.log(this.utilisateur);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(this.utilisateur);
    if (this.utilisateur.type != "supplier")  {
      // alert('Vous n\'avez pas le droit d\'acceder à cette page');
      // location.replace('/accueil');
      location.replace('/accessDenied');
      return false;
    }
    return true;
  }




}
