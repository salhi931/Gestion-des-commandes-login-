import {Input, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {Component, OnInit} from '@angular/core';
import { CommandeService} from './sercives/commande.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   constructor(private commandeservice: CommandeService) {
   }
  //@Input() skipToCtrl: boolean;

  title = 'backoffice';
  login: boolean;
     ngOnInit(){
        this.commandeservice.ligin.subscribe(data => {
          this.login = data;
        });
 }
  logout(){
    this.login = false;
    // tslint:disable-next-line:no-unused-expression
   }
}
