import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionComponent } from './auction/auction.component';

import { AuctionNewComponent } from './auction/auction-new/auction-new.component';
import { NotificationComponent } from './notification/notification.component';
import { AuctionDetailComponent } from './auction/auction-detail/auction-detail.component';
import { AuctionBeginComponent } from './auction/auction-begin/auction-begin.component';

const appRoutes: Routes = [
  {
    path: 'auction', component: AuctionComponent  , children: [
      { path: '', component: AuctionDetailComponent },// Bienvenida
      { path: 'new', component: AuctionNewComponent },// Formulario de registro
      { path: ':id', component: AuctionDetailComponent },// Mostrar informacion del plato enviado por la URL, : significa ruta dinamica
    ]
  },
  { path: 'notification', component: NotificationComponent },
  { path: '', redirectTo: 'auction', pathMatch: 'full' },

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],




exports: [RouterModule]
})
export class AppRoutingModule { }
