import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AuthService} from "../Services/auth.service";
import * as firebase from "firebase";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  AddForm: FormGroup;
  AddForm2: FormGroup;
  Etat = false;
  Error;
  user;
  Username;
  sh;
  user2 = JSON.parse(localStorage.getItem("user"));
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private http: HttpClient
            ) { }

  ngOnInit() {
    this.initForm();
    if(!this.user2){
      this.Etat = false ;
    }else{
      if(this.user2.Etat === true){
        this.Etat = true ;
        this.Username = this.user2.Username;
      }
    }  
  }
  
  initForm() {
    this.AddForm = this.formBuilder.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    this.AddForm2 = this.formBuilder.group({
      Email2: ['', [Validators.required]],
      Password2: ['', [Validators.required]],
    });
  }
  OnSubmit() {
    const Username = this.AddForm.get('Username').value;
    const Email = this.AddForm.get('Email').value;
    const Password = this.AddForm.get('Password').value;
    const User = {Username ,Email , Password}
    this.http.post('/api/adduser',User).subscribe((res) => {
      this.user = res;
        if(this.user[0].statue === 'Success'){
          let myObj = { Id:this.user[1].user._id , Username: this.user[1].user.Username , Password: this.user[1].user.Password , Role : this.user[1].user.Role , Etat : true  };
          localStorage.setItem("user", JSON.stringify(myObj));
          location.replace('/Shop');
            ;
        }else{
          this.Error = "Erreur";
        }
    });
  }
  OnSubmit2() {
    const Email2 = this.AddForm2.get('Email2').value;
    const Password2 = this.AddForm2.get('Password2').value;
    const User = {Email2 , Password2}
    this.http.post('/api/tryloginc',User).subscribe((res) => {
      this.user = res;
        if(this.user[0].statue === 'Success'){
          let myObj = { Id:this.user[1].user._id , Username: this.user[1].user.Username , Password: this.user[1].user.Password , Role : this.user[1].user.Role , Etat : true  };
          localStorage.setItem("user", JSON.stringify(myObj));
          location.replace('/Shop');
            ;
        }else{
          this.Error = "Erreur";
        }
    });
  }
  Logout(){
    localStorage.removeItem("user");
    location.replace('');
  }

  gopanier(){
    location.replace('/panier');
  }
  gocmd(){
    location.replace('/cmd');
  }

  Search(){
    localStorage.setItem("sh", JSON.stringify(this.sh));
    location.replace('/Shop2');

  }
}
