import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  pro;
  load=false;
  user = JSON.parse(localStorage.getItem("user"));
  quantity=1;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const Id = JSON.parse(localStorage.getItem("ID"));
    this.http.get('/api/getprod2/'+Id).subscribe((res) => {
      this.pro = res;
      this.load = true;
    });
  }

  Retour(){
    localStorage.removeItem("ID");
    location.replace('Shop');
  }
  Addtopanier(id){
    if(!this.user){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Vous n'etes pas connecte"
      })
    }
    else{
      const id2 = this.user.Id
      const qt = this.quantity
      const ID = {id,id2,qt}
      this.http.post('/api/addpanier',ID).subscribe((res) => {
      });
      localStorage.removeItem("ID");
      location.replace('Shop');

    }
    
  }

}
