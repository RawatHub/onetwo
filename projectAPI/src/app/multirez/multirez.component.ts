import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service';

@Component({
  selector: 'app-multirez',
  templateUrl: './multirez.component.html',
  styleUrls: ['./multirez.component.css']
})
export class MultirezComponent implements OnInit {

  search = this.getApi.search;
  Books: any;
  Movies: any;
  bm: number;
  boolb: boolean;
  boolm: boolean;

  constructor(private getApi: RequestAPIService) {
  }

  callToDisplay(index: number, title?) {
    // console.log("title fetch: ", title);
    this.getApi.goToDisplay(index, title);
  }

  ngOnInit() {
    this.bm = this.getApi.bm
    this.boolb = true;
    this.boolm = true;

    if (this.bm == 0) {
      this.Books = this.getApi.BookData;
      this.boolb = false
      this.boolm = true
    }

    else {
      this.Movies = this.getApi.MovieData;
      this.boolb = true;
      this.boolm = false;
    }

  }

}
