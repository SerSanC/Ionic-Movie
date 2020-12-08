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
    //Hace que las paginas de peliculas sean aleatorios
      this.id_list = Math.floor(Math.random() * 6) + 1  ;
  }

  ngOnInit(){
    this.api.getMoviesList(this.id_list,this.pageNumber).subscribe(res=>{
      console.log(res);
      this.rawData=res;
      for(let i of res['results']){
        this.data.push(i);
      }
    });
  }

  view(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }

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
