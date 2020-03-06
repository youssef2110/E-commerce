import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProductComponent } from './product/product.component';
import { EspacevendeurComponent } from './espacevendeur/espacevendeur.component';
import { PanierComponent } from './panier/panier.component';
import { NewprodComponent } from './newprod/newprod.component';
import { VendeurComponent } from './vendeur/vendeur.component';
import { UseGuardService } from './Services/use-guard.service';
import { CheekoutComponent } from './cheekout/cheekout.component';
import { SearchproComponent } from './searchpro/searchpro.component';
import { CommandeclientComponent } from './commandeclient/commandeclient.component';


const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'Shop' , component : AccueilComponent},
  {path : 'Shop2' , component : SearchproComponent},
  {path : 'Product', component : ProductComponent},
  {path : 'Espacevendeur', component : EspacevendeurComponent},
  {path : 'panier' , component : PanierComponent},
  {path : 'newprod' , component : NewprodComponent},
  {path : 'cmd' , component : CommandeclientComponent},
  {path : 'vendeur' , component : VendeurComponent},
  {path : 'payement' , component : CheekoutComponent},
  {path : '**' , redirectTo : ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
