import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ElHorra';
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyB4qkbNwcFmVSZXLvJYLmzQ-NN-RGkZLQ4",
      authDomain: "e-commerce-ad73b.firebaseapp.com",
      databaseURL: "https://e-commerce-ad73b.firebaseio.com",
      projectId: "e-commerce-ad73b",
      storageBucket: "e-commerce-ad73b.appspot.com",
      messagingSenderId: "181408531125",
      appId: "1:181408531125:web:15868799e55f51d2cf34fc",
      measurementId: "G-SP2J9LLF35"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
