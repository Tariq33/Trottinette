import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../service/client.service";
import {Client} from "../../model/client";
import {Router} from '@angular/router';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.scss']
})
export class CreationCompteComponent implements OnInit {

  clientForm: Client = new Client();
  confirmMotDePasse: string="";
  passwordMatch: boolean=true;
  isShow: boolean=false;

  constructor(private clientService : ClientService,private router: Router) {
  }

  somethingChanged(){
    if(this.clientForm.motDePasse!=this.confirmMotDePasse){
      this.passwordMatch=false;
      console.log("Pas les mêmes");
      return;
    }
    else{
      this.passwordMatch=true;
    }
  }

  toggleDisplay() {
    if(!this.isShow) this.isShow=true;
  }

  save() {

    this.clientService.create(this.clientForm).subscribe(resp => {
        this.clientForm = new Client();
        this.router.navigateByUrl('/logIn');
        },
        error => console.log(error)
      );

  }

  cancel() {
    this.clientForm = new Client();
  }

  ngOnInit(): void {
  }

}
