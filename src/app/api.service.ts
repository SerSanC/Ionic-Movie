import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public authToken:any='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTRhZDQ5NTZiZTFiN2JhNjRjMmY1MzQ1MzliODhjMCIsInN1YiI6IjVmY2U0ODE3OTVjMGFmMDA0NmE3NjFkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qhez7wSb73WwmiZNzq_ZYXvqwTjX-FmJmvgZ46HJUdw';
  public apiKey:any='514ad4956be1b7ba64c2f534539b88c0';
  public baseUrl:any='https://api.themoviedb.org/';
  public baseImageUrl:any='https://image.tmdb.org/t/p/w500/';
  constructor(
    public http:HttpClient
  ) { }


  setHeader(){
    let header =  new HttpHeaders({ Authorization: "Bearer " + this.authToken });
      return header;
    }

  getMoviesList(list_id,page){
    return this.http.get(this.baseUrl+'4/list/'+list_id+'?page='+page+'&api_key='+this.apiKey+'&language=es-ES&query=',{headers:this.setHeader()});
  }

  searchMovie(text){
    return this.http.get(this.baseUrl+'3/search/movie?api_key='+this.apiKey+'&language=es-ES&query='+text+'&page=1&include_adult=false',{headers:this.setHeader()});
  }
}
