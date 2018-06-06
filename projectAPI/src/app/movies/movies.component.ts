import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service'


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private getApi: RequestAPIService) { }

  mname: string;
  // = "batman";
  hide: boolean = true;
  errorMSG = 'Enter a valid Input';

  ApiByName(){
   if (this.mname.length == 0) {
    this.hide = false;
  } else {
    this.getApi.generateMovieURL(this.mname);
    console.log("Entered Name:", this.mname);
    this.hide = true;
  }
  }

  ngOnInit() {
  }

}
