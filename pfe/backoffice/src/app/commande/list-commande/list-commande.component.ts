import { Component, OnInit } from '@angular/core';
import {Articleachetes} from '../../models/articleachetes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CommandeService} from '../../sercives/commande.service';
@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {
  client_id: number;
  client_name: string;
  commercial_name : string;
  details = false;
  detail_index = 0;
  articlesachetes: Articleachetes[];
  prixtotal: number;
  loading = false;

  constructor( private infos: CommandeService) {
   }
  detail(index){
     this.detail_index = index;
     this.client_id = this.infos.commandes[this.detail_index].client_id1;
     this.client_name = this.infos.commandes[this.detail_index].client_name;
     this.commercial_name = this.infos.commandes[this.detail_index].commercial_name;
     this.articlesachetes = this.infos.commandes[this.detail_index].articlesachetes;
     this.prixtotal = this.infos.commandes[this.detail_index].totals_prix;
     this.loading = true;
    setTimeout(
      () => {
        this.details = !this.details;
        this.loading = false;
      }, 1000
    );

  }
  deletcommandes(){
    this.infos.deletcommandes().subscribe(donness => { alert('vous avez supprimer toutes les commandes'); }, error => {alert('error lors de la suppression des commandes') });
    this.infos.commandes = [];
  }
  ngOnInit() {
    this.infos.getcommandes();
    this.client_id = this.infos.commandes[this.detail_index].client_id1;
      this.client_name = this.infos.commandes[this.detail_index].client_name;
      this.commercial_name = this.infos.commandes[this.detail_index].commercial_name;
      //
     // this.test = this.infos.commandes[0].magasin_name;
  }
}
