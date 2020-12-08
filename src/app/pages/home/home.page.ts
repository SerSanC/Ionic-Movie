import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public data:any[]=[];
  public rawData:any;
  public pageNumber:number=1;
  public id_list:number;
  constructor(
    public api:ApiService,
    public router:Router
    ) {
    // Hace que las páginas de resultado sean aleatorias
      this.id_list = Math.floor(Math.random() * 6) + 1  ;
  }

  /**
   * Cargamos inicialmente las peliculas haciendo una llamada al servicio "api.service" definido.
   * Añadimos la información de las peliculas al array data.
   */
  ngOnInit(){
    this.api.getMoviesList(this.id_list,this.pageNumber).subscribe(res=>{
      console.log(res['results']);
      this.rawData=res;
      for(let i of res['results']){
        this.data.push(i);
      }
    });
  }
  /**
   * Esta función tiene como objetivo cargar la ruta de la vista 
   * @param data 
   */
  view(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }
  /**
   * Esta función se llama cuando queremos cargar una pagina adicional de peliculas
   * @param event 
   */
  loadData(event){
    this.api.getMoviesList(++this.id_list,this.pageNumber++).subscribe(res=>{
      console.log(res);
     setTimeout(() => {
      event.target.disabled = true;
     }, 2000);
      for(let i of res['results']){
        this.data.push(i);
      }
    });
  }
  /**
   * Función para buscar las peliculas, se hace una llamada al servicio "api.service" definido 
   * @param event 
   */
  search(event){
    console.log(event);
    if(event.detail.value==''){
      console.log('empty');
      this.data=[];
      this.ngOnInit();
    }else{
      this.api.searchMovie(event.detail.value).subscribe(res=>{
        console.log(res);
        this.data=res['results']
      },err=>{
        console.log('Porfavor, compruebe su conexión');
      })
    }
  }
}
