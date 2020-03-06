import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  all = true;
  typea = false;
  typeb = false;
  typec = false;
  config = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 3
  };
  malade = ["عسر الهضم" , "المغص المعوي","تقوية المعدة","الحُمى الشوكية","الإسهال","الإمساك","مرض السُكري","آلام الظهر","مرض الكوليرا","فيروس الإنفلونزا","مرض الربو","التهاب اللوزتين","الصوت المبحوح","السُعال","تصلب الشرايين","مرض الصرع"," مرض الروماتيزم","الجلد المُتشقق","مرض الجُذام","مرض البرص","مرض الأكزيما","مرض البُهاق","قشرة الرأس","مشاكل البشرة"]
  product ;
  producta = [] ;
  productb = [] ;
  productc = [] ;
  prod_malad = [];
  desease ;
  yes = true; no = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/getprod').subscribe((res) => {
      this.product = res;
      console.log(this.product)
      for(var i=0;i<this.product.length;i++){
        if(this.product[i].product_categorie === "typea"){
          this.producta.push(this.product[i])
        }
      }
      for(var i=0;i<this.product.length;i++){
        if(this.product[i].product_categorie === "typeb"){
          this.productb.push(this.product[i])
        }
      }
      for(var i=0;i<this.product.length;i++){
        if(this.product[i].product_categorie === "typec"){
          this.productc.push(this.product[i])
        }
      }
    });
  }
  
  /*createRange(){
    var items: number[] = [];
    for(var i = 1; i <= 1; i++){
       items.push(i);
    }
    return items;
  }*/

  maladesearch(){
    this.prod_malad = [];
    for(var i=0;i<this.productb.length;i++){
      var maladie = this.productb[i].product_for.split(' | ')
      console.log(maladie)
      for(var j=0;j<maladie.length;j++){
        if (this.desease === maladie[j]){
          this.prod_malad.push(this.productb[i])
        }
      }
    }
    console.log(this.prod_malad)
    this.yes = false;
    this.no = true;
  }
  Trans(id){
    let ID = id ;
    localStorage.setItem("ID", JSON.stringify(ID));
  }
  change(name : string){
    if(name === "typea"){
      this.all = false;
      this.typea = true;
      this.typeb = false;
      this.typec = false;
    }
    if(name === "typeb"){
      this.all = false;
      this.typea = false;
      this.typeb = true;
      this.typec = false;
    }
    if(name === "typec"){
      this.all = false;
      this.typea = false;
      this.typeb = false;
      this.typec = true;
    } 
  }
}
