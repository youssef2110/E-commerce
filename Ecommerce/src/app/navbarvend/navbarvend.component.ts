import { Component, OnInit } from '@angular/core';
import {AuthService} from "../Services/auth.service";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbarvend',
  templateUrl: './navbarvend.component.html',
  styleUrls: ['./navbarvend.component.scss']
})
export class NavbarvendComponent implements OnInit {
  usr;
  user = JSON.parse(localStorage.getItem("user"));
  Username = this.user.Username
  constructor(private authService: AuthService
    ,private http: HttpClient) { }

  ngOnInit() {

  }
  Logout(){
    localStorage.removeItem("user");
    location.replace('');
  }
}
