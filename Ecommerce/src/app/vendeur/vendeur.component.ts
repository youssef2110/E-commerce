import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {ProductService} from "../Services/Product.service";
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.scss']
})
export class VendeurComponent implements OnInit {
  g=false;
  product ; 
  object ; 
  commandeall;
  productt = [];
  con =[] ;
  cmd = [];
  edd = true;
  id;
  ok;
  yo =true ; yoo=false;
  test;test2;
  product_name;
  product_categorie;
  available_quantity;
  product_price;
  product_description;
  cmddetails = [];
  user = JSON.parse(localStorage.getItem("user"));

  constructor(private ProductService: ProductService,
    private http: HttpClient,) { }

  ngOnInit() {
    const Id = this.user.Id
    this.http.get('/api/getprod/'+Id).subscribe((res) => {
      this.product = res;
      this.http.get('/api/getcmd2').subscribe((res) => {
        this.commandeall = res;
        console.log(this.commandeall)
        var b = 0;
        for(var i in this.commandeall){
          for(var c in this.product){
            if(this.commandeall[i].product.Id_prod === this.product[c]._id ){
              this.productt[b] = this.commandeall[i].product;
              this.cmd[b] = this.commandeall[i];
              b++;
            }
          }
        }
        console.log(this.cmd)
      });
      
    });
  }
Cmd(){
  this.g = !this.g;
}
prod(){
  this.g = !this.g;
}
edit(id,product_name,product_categorie,available_quantity,product_price,product_description){
  this.id = id;
  this.product_name = product_name;
  this.product_categorie = product_categorie;
  this.available_quantity = available_quantity;
  this.product_price = product_price;
  this.product_description = product_description;
  this.edd = !this.edd;
}
retour(){
  this.edd = !this.edd;
}
edit2(f){
  const id = this.id;
  const usr = [];
  usr[0] = id ;
  usr[1] = f.value;
  this.http.post('/api/editprod',usr).subscribe((res) => {
    this.test = res;
      if(this.test[0].statue === 'Success'){
        Swal.fire({
          icon: 'success',
          title: 'Produit Modifié',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            location.replace('vendeur');
          }
        })
    }
  });
}
del(id,images){
  this.ProductService.deleteImage(images)
  this.http.get('/api/deletprod/'+id).subscribe((res) => {
    this.test2 = res;
      if(this.test2[0].statue === 'Success'){
        Swal.fire({
          icon: 'success',
          title: 'Produit Supprime',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            location.replace('vendeur');
          }
        })
    }
  })
}
details(id){
  this.cmddetails = [];
  console.log(id)
  for(var i=0 ; i<this.cmd.length ;i++){
    if(this.cmd[i].product._id === id){
      this.cmddetails.push(this.cmd[i]);
    }
  }
this.yo = false ;
this.yoo = true;
}
retour2(){
  this.yo = true ;
  this.yoo = false;
}
changeetat(id,type){
  const don = {id,type}
  this.http.post('/api/changeetat',don).subscribe((res) => {
    this.ok = res;
    for(var i=0;i<this.cmd.length;i++){
      if(this.cmd[i]._id === id){
         if(this.cmd[i].Etat === "Non livré"){
            this.cmd[i].Etat = "Livré"
          }else{
            if(this.cmd[i].Etat === "Livré"){
              this.cmd[i].Etat = "Non livré"
            }
          }
          
      }
    }
  });
}

}
