import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionComponent } from './auction/auction.component';

import { AuctionNewComponent } from './auction/auction-new/auction-new.component';
import { NotificationComponent } from './notification/notification.component';
import { AuctionDetailComponent } from './auction/auction-detail/auction-detail.component';
import { AuctionBeginComponent } from './auction/auction-begin/auction-begin.component';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './_services/login-guard.service';

const appRoutes: Routes = [
  {
    path: 'auction', component: AuctionComponent, children: [
      { path: '', component: AuctionBeginComponent },// Bienvenida
      { path: 'new', component: AuctionNewComponent },// Formulario de registro
      { path: ':id', component: AuctionDetailComponent },// Mostrar informacion del plato enviado por la URL, : significa ruta dinamica
    ], canActivate: [LoginGuard]
  },
  { path: 'notification', component: NotificationComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default Component
  { path: 'login', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }