import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import {Platform } from '@ionic/angular'


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public altura:number;
  public anchura: number;
  public data:any;
  public res :boolean;
  public view : boolean;
  public trailer: string;
  public genre:string;
  constructor(
    public route:ActivatedRoute,
    public api:ApiService,
    public platform: Platform
  ) { 
    this.res = false;
    this.genre = ""
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
        console.log(this.data);
      }
    });
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
           console.log('android');
           this.altura = 350;
           this.anchura = 350;
      } else if (this.platform.is('ios')) {
           console.log('ios');
           this.altura = 350;
           this.anchura = 350;           
      } else {
           //fallback to browser APIs or
           console.log('The platform is not supported');
           this.altura = 400;
           this.anchura = 640;
        }
    });
  }

  ngOnInit() {
    this.loadYoutubeVideo()
    this.loadGenre()
  }
  /**
   * Función encargada de adaptar la abreviatura del idioma devuelto por el json a su correcto nombre
   * @param data 
   */
  idiom(data){

    if(data.original_language.trim()==("en")){
      data.original_language = "Inglés";
      this.res = true;
    }    
    if(data.original_language.trim()==("es")){
      data.original_language = "Español";
      this.res = true;
    }
    if(data.original_language.trim()==("ja")){
      data.original_language = "Japonés";
      this.res = true;
    }
    return this.res;
  }

  loadYoutubeVideo(){
    this.api.getVideoMovie(this.data.id).subscribe(res=>{
      console.log(res)        
      if(res['results'].length == 0 || res['results'][0].key==''){
        this.trailer = '';
        this.view = false;
      }
      else{
        console.log(res['results'][0].key);
        this.trailer = res['results'][0].key;
        this.view = true;
      }
    });
        
    console.log(this.trailer);
    //Carga el reproductor de la API en un iFrame
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    return this.view;
  }

  loadGenre(){
    this.api.getGenre(this.data.id).subscribe(gen=>{
      console.log("Pu"+ gen['id'])        
      if(gen['genres'].length == 0){
        console.log("Prueba"+gen['results'])
      }
      else{
        for(let i in gen['genres']){        
          this.genre += gen['genres'][i].name + ","
          console.log(this.genre)
        }
        //this.trailer = res['results'][0].key;
        //this.view = true;
      }
    });
  }
}
