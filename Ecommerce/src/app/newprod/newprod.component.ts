import { Component, OnInit, Injectable } from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {ProductService} from "../Services/Product.service";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-newprod',
  templateUrl: './newprod.component.html',
  styleUrls: ['./newprod.component.scss']
})
export class NewprodComponent implements OnInit {
  usr;
  AddForm: FormGroup;
  Error;
  task ;
  task2;
  task3;
  test;
  url1;url2;url3;
  med = false ;
  table = ''
  malade = ["عسر الهضم" , "المغص المعوي","تقوية المعدة","الحُمى الشوكية","الإسهال","الإمساك","مرض السُكري","آلام الظهر","مرض الكوليرا","فيروس الإنفلونزا","مرض الربو","التهاب اللوزتين","الصوت المبحوح","السُعال","تصلب الشرايين","مرض الصرع"," مرض الروماتيزم","الجلد المُتشقق","مرض الجُذام","مرض البرص","مرض الأكزيما","مرض البُهاق","قشرة الرأس","مشاكل البشرة"]
  user = JSON.parse(localStorage.getItem("user"));
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private ProductService: ProductService,
    private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }
  ee(event){
    console.log(event.target.value)
    this.table = this.table+' | '+event.target.value
  }
  initForm() {
    this.AddForm = this.formBuilder.group({
      product_name: ['', [Validators.required]],
      product_categorie: ['', [Validators.required]],
      available_quantity: ['', [Validators.required]],
      product_price: ['', [Validators.required]],
      product_for: ['', [Validators.required]],
      filebutton: ['', [Validators.required]],
      filebutton2: ['', [Validators.required]],
      filebutton3: ['', [Validators.required]],
      product_description: ['', [Validators.required]]
    });
  }
  upload(event) {
    this.task = event.target.files[0];
  }
  upload2(event) {
    this.task2 = event.target.files[0];
  }
  upload3(event) {
    this.task3 = event.target.files[0];
  }
  medical(event) {
    console.log(event.target.value)
    if(event.target.value === "typeb"){
      this.med = true;
    }else{
      this.med = false;
    }
  }

  OnSubmit() {
    const product_name = this.AddForm.get('product_name').value;
    const product_categorie = this.AddForm.get('product_categorie').value;
    const available_quantity = this.AddForm.get('available_quantity').value;
    const product_price = this.AddForm.get('product_price').value;
    const filebutton = this.task;
    const filebutton2 = this.task2
    const filebutton3 = this.task3
    const product_description = this.AddForm.get('product_description').value;
    const product_for = this.table;
    const test =  Math.round(Math.random() * 10000000);
    const test2 =  Math.round(Math.random() * 10000000);
    const test3 =  Math.round(Math.random() * 10000000);
    this.ProductService.uploadImage(filebutton , test).then(photoURL => {
      this.url1 = photoURL.toString();
    }).then(()=>{
      this.ProductService.uploadImage(filebutton2 , test2).then(photoURL => {
        this.url2 = photoURL.toString();
      }).then(()=>{
        this.ProductService.uploadImage(filebutton3 , test3).then(photoURL => {
          this.url3 = photoURL.toString();
        }).then(()=>{
        const url1 = this.url1;
        const url2 = this.url2;
        const url3 = this.url3;
        const image1 = "Image" +test;
        const image2 = "Image" +test2;
        const image3 = "Image" +test3;
        const images = {image1,image2,image3};
        const ID = this.user.Id;
        const usr = {ID,product_name,product_categorie,available_quantity,product_for,product_price,images,url1,url2,url3,product_description}
        this.http.post('/api/addprod',usr).subscribe((res) => {
          this.test = res;
            if(this.test[0].statue === 'Success'){
              Swal.fire({
                icon: 'success',
                title: 'Produit Ajouté',
                confirmButtonText: 'Okay'
              }).then((result) => {
                if (result.value) {
                  location.replace('vendeur');
                }
              })
          }
        });
      })
    })
    })
    
  }

}
