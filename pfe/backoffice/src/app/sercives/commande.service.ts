import {Injectable} from '@angular/core';
import {Commandes} from '../models/commandes';
import {Articleachetes} from '../models/articleachetes';
import {EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommandeService implements OnInit{
  constructor( private http: HttpClient) {
  }
  clients = [
    {clientname : 'client1',
      clientid : 0},
    {clientname : 'client2',
      clientid : 1},
    {clientname : 'client3',
      clientid : 2}];
  commerciaux = [
    {commercialname : 'commercial1',
      commercialid : 1},
    {commercialname : 'commercial2',
      commercialid : 2},
    {commercialname : 'commercial3',
      commercialid : 3}];
  articles = [
    {articleidnname: 'article1', quantite: 1, prix: 10, img : 'https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/92/740622/1.jpg?2678'},
    {articleidnname: 'article2', quantite: 1, prix: 20, img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmmLUgUkei8sLRGqqD8zwGDVMv5b8LpyVUvA&usqp=CAU'},
    {articleidnname: 'article3', quantite: 1, prix: 120, img : 'https://www.biensdeconso.com/wp-content/uploads/sites/6/2016/08/Fotolia_46519937_L-Copie-2-e1566939175410.jpg'}


  ];
  magasin = [
    {magasinname: 'magasin1'},
    {magasinname: 'magasin2'},
    {magasinname: 'magasin3'}
  ];
  commandes: Commandes[] ;
  deletcommandes(){
    return this.http
      .delete('https://ng-serve-353a7-default-rtdb.firebaseio.com/commandes.json');
  }
  getcommandes(){
    this.http
      .get('https://ng-serve-353a7-default-rtdb.firebaseio.com/commandes.json')
      .pipe(map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
      )
      .subscribe(data => {
        this.commandes = data;
        });

  }
  ligin = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.getcommandes();
  }


}
