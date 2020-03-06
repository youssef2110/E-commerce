import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Id ;
  User ;
  test
  constructor() {
  }

    AjouterUtilisateur(Email: string, Password: string,Username:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(Email, Password).then(
          () => {
            if(firebase.auth().currentUser){
              this.Id = firebase.auth().currentUser.uid; 
              this.User = new User(Username,"Client");
              firebase.database().ref("/Users").child(this.Id).set(this.User);
              firebase.auth().currentUser.updateProfile({
              displayName: "Client",
            }).then(
                (s)=>{} // perform any other operation
              )}
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }

    );
  }
  
  AjouterVend(Email: string, Password: string,Username:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(Email, Password).then(
          () => {
            if(firebase.auth().currentUser){
              this.Id = firebase.auth().currentUser.uid; 
              this.User = new User(Username,"Vendeur");
              firebase.database().ref("/Users").child(this.Id).set(this.User).then(
                (error) => {
                  console.log(error);
                }
              );
              firebase.auth().currentUser.updateProfile({
              displayName: "Vendeur",
            }).then(
                (s)=>{} // perform any other operation
              )}
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }

    );
  }

  AuthentifierUtilisateur(Email: string, Password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(Email, Password).then(
          () => {
            if(firebase.auth().currentUser.displayName === "Client"){
              resolve();
            }else{
              reject("Not found");
              firebase.auth().signOut();
            }
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  AuthentifierVendeur(Email: string, Password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(Email, Password).then(
          () => {
            if(firebase.auth().currentUser.displayName === "Vendeur"){
              resolve();
            }else{
              reject("Not found");
              firebase.auth().signOut();
              
            }
            
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  Logout() {
    firebase.auth().signOut();
  }
  getUser(id:string){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Users/'+id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
}

export class User {

  username : string;
  role : string;
  constructor(username :string,role:string){
    this.username = username;
    this.role = role;
  }

}