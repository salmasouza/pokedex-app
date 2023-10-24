import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

  constructor(
    private http: HttpClient

  ) { }

  get apiListaPokemon(): Observable<any>{
    return this.http.get<any>(this.url).pipe(

      tap(resp => resp),
      tap(resp => {
        resp.results.map( (respPokemon : any) =>{
          
          this.apiGetPokemon(respPokemon.url).
          subscribe(resp => respPokemon.status = resp);

        })
      }),
    );
  }


  public apiGetPokemon( url: string): Observable<any>{
    return this.http.get<any>(url).pipe(
      map(
        resp => resp
      )

    )

  }
  
}
