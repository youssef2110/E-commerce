import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AuthService} from "../Services/auth.service";
import * as firebase from "firebase";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-espacevendeur',
  templateUrl: './espacevendeur.component.html',
  styleUrls: ['./espacevendeur.component.scss']
})
export class EspacevendeurComponent implements OnInit {
  fo = true;
  AddForm: FormGroup;
  AddForm2: FormGroup;
  connected = false;
  usr = {} ;
  Error;
  user ;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    document.getElementById('btn1').style.backgroundColor = "#343a40";
    document.getElementById('btn2').style.backgroundColor = "#ffffff";
    document.getElementById('btn1').style.color = "#ffffff";
    document.getElementById('btn2').style.color = "#343a40";
    this.initForm();
  }

  Insc(){
    this.fo = false;
    document.getElementById('btn1').style.backgroundColor = "#ffffff";
    document.getElementById('btn2').style.backgroundColor = "#343a40";
    document.getElementById('btn1').style.color = "#343a40";
    document.getElementById('btn2').style.color = "#ffffff";
  }
  Con(){
    this.fo = true;
    document.getElementById('btn1').style.backgroundColor = "#343a40";
    document.getElementById('btn2').style.backgroundColor = "#ffffff";
    document.getElementById('btn1').style.color = "#ffffff";
    document.getElementById('btn2').style.color = "#343a40";
  }
  

  initForm() {
    this.AddForm = this.formBuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    this.AddForm2 = this.formBuilder.group({
      Username: ['', [Validators.required]],
      Email2: ['', [Validators.required]],
      Password2: ['', [Validators.required]],
    });
  }
  OnSubmit2() {
    const Username = this.AddForm2.get('Username').value;
    const Email2 = this.AddForm2.get('Email2').value;
    const Password2 = this.AddForm2.get('Password2').value;
    const User = {Username ,Email2 , Password2}
    this.http.post('/api/addvendeur',User).subscribe((res) => {
      this.user = res;
        if(this.user[0].statue === 'Success'){
          let myObj = {Id:this.user[1].user._id , Username: this.user[1].user.Username , Password: this.user[1].user.Password , Role : this.user[1].user.Role , Etat : true  };
          localStorage.setItem("user", JSON.stringify(myObj));
          location.replace('vendeur');
            ;
        }else{
          this.Error = "Erreur";
        }
    });
  }
  OnSubmit() {
    const Email = this.AddForm.get('Email').value;
    const Password = this.AddForm.get('Password').value;
    const User = {Email , Password}
    this.http.post('/api/tryloginv',User).subscribe((res) => {
      this.user = res;
        if(this.user[0].statue === 'Success'){
          let myObj = {Id:this.user[1].user._id , Username: this.user[1].user.Username , Password: this.user[1].user.Password , Role : this.user[1].user.Role , Etat : true  };
          localStorage.setItem("user", JSON.stringify(myObj));
          location.replace('vendeur');
            ;
        }else{
          this.Error = "Erreur";
        }
    });
  }

}
