import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavprodComponent } from './navprod/navprod.component';
import { ProductComponent } from './product/product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { EspacevendeurComponent } from './espacevendeur/espacevendeur.component';
import { PanierComponent } from './panier/panier.component';
import { NewprodComponent } from './newprod/newprod.component';
import { VendeurComponent } from './vendeur/vendeur.component';
import { NavbarvendComponent } from './navbarvend/navbarvend.component';
import { CheekoutComponent } from './cheekout/cheekout.component';
import { SearchproComponent } from './searchpro/searchpro.component';
import { CommandeclientComponent } from './commandeclient/commandeclient.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AccueilComponent,
    NavprodComponent,
    ProductComponent,
    EspacevendeurComponent,
    PanierComponent,
    NewprodComponent,
    VendeurComponent,
    NavbarvendComponent,
    CheekoutComponent,
    SearchproComponent,
    CommandeclientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
