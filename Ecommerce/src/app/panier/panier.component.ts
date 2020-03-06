import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  pro;
  load=false;
  price=0;
  user = JSON.parse(localStorage.getItem("user"));
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const Id = this.user.Id
    this.http.get('/api/getpanier/'+Id).subscribe((res) => {
      this.pro = res;
      this.load = true;
      console.log(this.pro)
      for(var i=0;i<this.pro.length;i++){
        this.price = this.price + this.pro[i].product_price*this.pro[i].quantity
      }
    });
    
  }

  Cheek(){
    location.replace('/payement');
  }

}
