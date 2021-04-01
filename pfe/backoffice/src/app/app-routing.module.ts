import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LancementCommandeComponent} from './commande/lancement-commande/lancement-commande.component';
import {ListCommandeComponent} from './commande/list-commande/list-commande.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'lancer-commande', component: LancementCommandeComponent },
  { path: 'list-commande', component: ListCommandeComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
