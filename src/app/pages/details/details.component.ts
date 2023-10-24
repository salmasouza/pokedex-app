import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;


  constructor(
    private  activeRoute: ActivatedRoute,
    private pokerService: PokeApiService,
    
    ){ }
  
  ngOnInit():void {
     this.getPokemon;
  }

  get getPokemon(){
    const id = this.activeRoute.snapshot.params['id'];
    const pokemon = this.pokerService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokerService.apiGetPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      resp => {
        this.pokemon = resp;
        this.isLoading = true;
      },
      error => {
        this.apiError = true;
      }

    )}

}
