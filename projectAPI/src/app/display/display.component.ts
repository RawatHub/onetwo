import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service';
import { Router } from '@angular/router'
 
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private getApi: RequestAPIService) { }

  BookDetails;
  index: number;
  isPDF: boolean;

  ngOnInit() {
    this.index = this.getApi.index;
    this.BookDetails = this.getApi.BookData[this.index];
    this.isPDF = !this.BookDetails.accessInfo.pdf.isAvailable;
    //this.isPDF = this.BookDetails.accessInfo.pdf.isAvailable    

      console.log("Book Selected: ", this.BookDetails);
      this.BookDetails = {
        bimgURL: this.BookDetails.volumeInfo.imageLinks.thumbnail,
        btitle: this.BookDetails.volumeInfo.title,
        authors: this.BookDetails.volumeInfo.authors[0],
        lang: this.BookDetails.volumeInfo.language,
        avgRating: this.BookDetails.volumeInfo.averageRating,
        description: this.BookDetails.volumeInfo.description,
        isbn: this.BookDetails.volumeInfo.industryIdentifiers[0].identifier,
        preview: this.BookDetails.volumeInfo.previewLink,
        year: this.BookDetails.volumeInfo.publishedDate,
        pdf: this.BookDetails.accessInfo.pdf.acsTokenLink
      }
      
  }
}
