import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchpro',
  templateUrl: './searchpro.component.html',
  styleUrls: ['./searchpro.component.scss']
})
export class SearchproComponent implements OnInit {
  config = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 3
  };
  product = [];
  prod
  sh = JSON.parse(localStorage.getItem("sh"));
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/getprod').subscribe((res) => {
      this.prod = res;
      var c = 0;
      console.log(this.prod)
      for(var i=0;i<this.prod.length ; i++){
        var list = this.prod[i].product_name.split(" ");
        for(var j=0 ;j<list.length;j++){
          if(this.sh === list[j]){
            this.product[c] = this.prod[i] ;
            c++ ;
          }
        }
      }
      console.log(this.product)
    });
  }

}
