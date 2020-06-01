import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToWebSiteGoogle(): void {
    document.location.href = 'https://www.google.fr/';
  }

  goToWebSiteBordeaux(): void {
    document.location.href = 'http://www.bordeaux.fr/';
  }

  goToWebSiteHSBC(): void {
    document.location.href = 'https://www.hsbc.fr/';
  }

}
