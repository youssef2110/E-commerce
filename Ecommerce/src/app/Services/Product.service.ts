import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Produits = {};
  Produit;
  url ;
  url2 ;
  constructor() {
  }
 

  NewProduct(id:string , product_name : string, product_categorie : string,available_quantity : Number, product_price : Number ,filebutton: File ,filebutton2: File ,product_description : string){
    return new Promise(
      (resolve, reject) => {
        this.uploadImage(filebutton , 4).then(photoURL => {
          this.url = photoURL.toString();
          console.log(this.url)
        });
        this.uploadImage(filebutton2, 3).then(photoURL => {
          this.url2 = photoURL.toString();
        });
        this.Produit = new Produits(product_name, product_categorie,available_quantity,product_price,this.url,this.url2,product_description);
        firebase.database().ref('/Product/'+id).child(product_name).set(this.Produit);
      }
    );
  }

  getProduct(id:string){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Product/'+id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  uploadImage(imageURI , number) {
    return new Promise ((resolve, reject) => {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child('Product').child('Image'+ number);
        imageRef.put(imageURI).then(snapshot => {
          resolve(snapshot.ref.getDownloadURL());
      }, err => {
          reject(err);
      });
    });
}
deleteImage(obj) {
  return new Promise ((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      for(let img in obj){
        const desertRef = storageRef.child('Product').child(obj[img]);
        desertRef.delete().then(function() {
        
        }).catch(function(error) {
          reject(error);
        });
      }
      

  });
}


}
export class Produits {
  product_name : string;
  product_categorie : string;
  available_quantity : Number;
  product_price : Number ;
  url11 : string;
  url22 : string;
  product_description : string;
  constructor(product_name : string,product_categorie : string,available_quantity : Number,product_price : Number ,url11 : string,url22 : string,product_description : string){
    this.product_name = product_name ;
    this.product_categorie = product_categorie;
    this.available_quantity = available_quantity;
    this.product_price = product_price;
    this.url11 = url11;
    this.url22 = url22;
    this.product_description = product_description;
  }

}
