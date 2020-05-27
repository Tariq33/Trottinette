import { Component, OnInit } from '@angular/core';
import {Administrateur} from '../../model/administrateur';
import {AdministrateurService} from '../../service/administrateur.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mon-compte-administrateur-maj-info',
  templateUrl: './mon-compte-administrateur-maj-info.component.html',
  styleUrls: ['./mon-compte-administrateur-maj-info.component.scss']
})
export class MonCompteAdministrateurMajInfoComponent implements OnInit {

  administrateurForm: Administrateur = new Administrateur();

  constructor(private adminstrateurService: AdministrateurService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let id = params['id'];

        this.adminstrateurService.findById(id).subscribe(resp => this.administrateurForm = resp, error => console.log(error));

  })
  }

  save() {
    if (!this.administrateurForm.id) {
      this.adminstrateurService.create(this.administrateurForm).subscribe(resp => {
          this.administrateurForm = null;
          this.adminstrateurService.load();
        },
        error => console.log(error)
      )

    } else {
      this.adminstrateurService.modify(this.administrateurForm).subscribe(resp => {
        this.administrateurForm = null;
        this.adminstrateurService.load();
      }, error => console.log(error));
    }
  }

  cancel() {
    this.administrateurForm = null;
  }

}
