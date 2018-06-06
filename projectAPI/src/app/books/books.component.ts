import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bname:string;
  // = "Angels and Demons";
  isbn: number;  
  // = 9781350033245;
  errorMSG = 'Enter a valid Input';
  hide = true;
 
  constructor(private getApi: RequestAPIService) {
  }

  ApiByName() {
    if (this.bname.length == 0) {
      this.hide = false;
    } else {
      this.getApi.generateBookURL(this.bname);
      console.log("Entered Name:", this.bname);
      this.hide = true;
    }
  }

  ApiByIsbn() {
    if (this.isbn == undefined || this.isbn == null || this.isbn < 0 ) {
      this.hide = false;
    } else {
      this.getApi.generateBookURL(this.isbn);
      console.log("Entered ISBN:", this.isbn);
      this.hide = true;
    }
  }

 
  ngOnInit() {
  }

}
