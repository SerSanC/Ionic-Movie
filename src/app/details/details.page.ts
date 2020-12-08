import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public data:any;
  public res :boolean;
  constructor(
    public route:ActivatedRoute,
    public api:ApiService
  ) { 
    this.res = false;
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
        console.log(this.data);
      }
    });
  }

  ngOnInit() {
  }

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
      data.original_language = "Japones";
      this.res = true;
    }
    return this.res;
  }
}
