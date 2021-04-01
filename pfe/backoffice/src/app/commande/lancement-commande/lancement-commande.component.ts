import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../sercives/commande.service';
import {Articleachetes} from '../../models/articleachetes';
import {Commandes} from '../../models/commandes';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lancement-commande',
  templateUrl: './lancement-commande.component.html',
  styleUrls: ['./lancement-commande.component.css']
})
export class LancementCommandeComponent  implements OnInit {
  constructor(private infos: CommandeService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {

  }
  // variables de autocomplete
  myControl = new FormControl();
  options: string[] = ['article1', 'article2' , 'articl3'] ;
  filteredOptions: Observable<string[]>;

  // variables locales
  clients: any;
  commerciaux;
  articles;
  article_selected;
  article_quantite;
  magasins;
  client_id_selected = 0;
  commercial_selected: any;
  magasin_selected;
  auto: any   ;
  prix_totale = 0;
  loading;
  commandeerreur = false;
  commande: Commandes =  {client_id1 : null, client_name: null, commercial_name: null, magasin_name: null, articlesachetes : null,
    totals_prix : null
  };
  articlesachetes;

  ngOnInit(): void {
    this.loading = this.infos.loading;
    this.infos.getcommandes();
    this.articlesachetes = this.infos.articlesachetes;
    this.loading = false;
    // this.geterreur();
    this.clients = this.infos.clients;
    this.commerciaux = this.infos.commerciaux;
    this.magasins = this.infos.magasin;
    this.articles = this.infos.articles;

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    // this.getprix() ;
  }
  // l'autocomplete des articles
  private _filter(value: string): string[] {
    if (value.length > 1){
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.toLowerCase().includes(filterValue)); }
  }





  calculerprix(){
    this.prix_totale = this.infos.calculerprixarticle((this.options.indexOf(this.article_selected)));
  }

  getimgurl(option){
    return this.articles[this.options.indexOf(option)].img;
  }

  ajouterarticle(){
    this.infos.ajouterarticle(this.options.indexOf(this.article_selected), this.client_id_selected, this.article_quantite);
    this.calculerprix() ;
  }


  getcommande(){
    if (this.client_id_selected !==  undefined ) {
      this.commande.client_id1 = this.client_id_selected ;
      this.commande.client_name = this.clients[this.client_id_selected].clientname ;
      this.commande.commercial_name = this.commercial_selected ;
      this.commande.magasin_name = this.magasin_selected ;
      this.commande.articlesachetes = this.articlesachetes;
      this.commande.totals_prix = this.prix_totale;
      this.infos.commandes.push(this.commande);
      this.loading = true;
      console.log(this.infos.commandes);
      this.http.post('https://ng-serve-353a7-default-rtdb.firebaseio.com/commandes.json', this.commande).subscribe(data => {
        console.log(data);
      }, error => {alert('error lors de l\'ajout de la commande'); }, () => {alert('vous avez lancez une commande'); } );
      // alert('vous avez lancez une commande');

      setTimeout(
        () => {
          this.router.navigate(['/list-commande'], {relativeTo: this.route});
        }, 1000
      );
    }

  }

  delete(index){
    this.articlesachetes.splice(index, 1);
    this.calculerprix () ;
  }
  geterreur(){
    if (this.commande.client_id1 !== undefined   ){
      this.commandeerreur = true;

    }
  }

}
