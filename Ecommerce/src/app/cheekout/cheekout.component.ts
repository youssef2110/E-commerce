import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cheekout',
  templateUrl: './cheekout.component.html',
  styleUrls: ['./cheekout.component.scss']
})
export class CheekoutComponent implements OnInit {
  AddForm: FormGroup;
  pro;
  repo;
  load=false;
  price=0;
  user = JSON.parse(localStorage.getItem("user"));
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
    const Id = this.user.Id
    this.http.get('/api/getpanier/'+Id).subscribe((res) => {
      this.pro = res;
      this.load = true;
      for(var i=0;i<this.pro.length;i++){
        this.price = this.price + this.pro[i].product_price*this.pro[i].quantity
      }
    });
  }
  initForm() {
    this.AddForm = this.formBuilder.group({
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
      Adresse: ['', [Validators.required]],
      Telephone: ['', [Validators.required]],
      Ville: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
    });
  }
  valider(){
    const Nom = this.AddForm.get('Nom').value;
    const Prenom = this.AddForm.get('Prenom').value;
    const Adresse = this.AddForm.get('Adresse').value;
    const Telephone = this.AddForm.get('Telephone').value;
    const Ville = this.AddForm.get('Ville').value;
    const ZipCode = this.AddForm.get('ZipCode').value;
    const product = this.pro ;
    const iden = this.user.Id;
    const User = {product , iden , Nom , Prenom , Adresse , Telephone , Ville , ZipCode }
    this.http.post('/api/addcmd',User).subscribe((res) => {
      this.repo = res;
      if(this.repo[0].statue === 'Success'){
        Swal.fire({
          icon: 'success',
          title: 'Commande Ajouté',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.value) {
            location.replace('shop');
          }
        })
        
      }
    });
  }

}
