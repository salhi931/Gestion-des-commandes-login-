import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommandeService} from '../sercives/commande.service';
import {NgForm} from '@angular/forms';
import {NgModule} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private commandeservice: CommandeService ,private router: Router, private route: ActivatedRoute) { }

  auth(form: NgForm){
    const value = form.value;
    if (value.username === 'achour@gmail.com' && value.password === '123')
    {this.commandeservice.ligin.emit(true);
    alert('nice');
     this.router.navigate(['/list-commande'], {relativeTo: this.route});}
     else {alert('verivierz le mot de pass et le nom d\'utilisateur'); }
    }

    //else {this.commandeservice.ligin.emit(true); }

  ngOnInit(): void {
    this.commandeservice.ligin.emit(true);
  }

}
