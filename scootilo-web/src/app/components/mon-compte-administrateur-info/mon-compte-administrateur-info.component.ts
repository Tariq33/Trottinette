import {Component, OnInit} from '@angular/core';
import {Administrateur} from '../../model/administrateur';
import {AdministrateurService} from '../../service/administrateur.service';
import {SessionService} from '../../service/session.service';

@Component({
  selector: 'app-mon-compte-administrateur-info',
  templateUrl: './mon-compte-administrateur-info.component.html',
  styleUrls: ['./mon-compte-administrateur-info.component.scss']
})
export class MonCompteAdministrateurInfoComponent implements OnInit {
  administrateurForm: Administrateur = new Administrateur();

  constructor(private sessionService : SessionService, private administrateurService: AdministrateurService) {
    this.administrateurForm=this.sessionService.getClient();
  }

  ngOnInit(): void {
      }

  edit(id: number) {
    this.administrateurService.findById(id).subscribe(resp => {
        this.administrateurForm = resp;
        this.administrateurService.load();
      },
      error => console.log(error)
    )
  }

}
