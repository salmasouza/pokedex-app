import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public isLoading: boolean = false;
  public apiError: boolean = false;
  private setAllPokemon:any;
  public getAllPokemon:any;
 

  constructor(
    private pokerApiService: PokeApiService,
    
  ){ }

  ngOnInit():void {

    this.pokerApiService.apiListaPokemon
    .subscribe(resp => {

      this.setAllPokemon = resp.results;
      this.getAllPokemon = this.setAllPokemon;
    },
    error =>{
      this.apiError = true;
    });
  }

  public buscaSearch(value:string){

    const filter = this.setAllPokemon.filter((resp: any) => {
      return !resp.name.indexOf(value.toLowerCase());

    });

    this.getAllPokemon = filter;

  }

}
