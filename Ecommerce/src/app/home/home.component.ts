import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  Etat;
  constructor() { }

  ngOnInit() {
    if(this.user.Etat === null){
      this.Etat = false ;
    }
    if(this.user.Etat === true){
      if(this.user.Role === "Vendeur"){
        this.Etat = true ;
      }
    }
  }

}
