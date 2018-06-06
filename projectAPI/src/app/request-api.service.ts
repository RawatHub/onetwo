import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestAPIService {

  constructor(private http: HttpClient, private router: Router) { }

  bm: number;
  index: number;
  BookData: any;
  MovieData: any;
  search: string | number;
  error: string = "No Results Found!";


  generateBookURL(query: string | number) {
    var baseURL = "https://www.googleapis.com/books/v1/volumes?q="
    var url: string
    this.search = query;
    if (typeof query == "string") {
      url = baseURL + "title=" + query + "&maxResults=12";
      // "&maxResults=1";
      //  console.log(url);
    }
    else if (typeof query == "number") {
      query.toString;
      url = baseURL + "isbn:" + query;
      // console.log(url); 
    }

    this.getResponse(url).subscribe((res) => {
      this.BookData = res.items;
    },
      (err) => {
        console.log(err)
      },
      () => {
        console.log("Books Found: ", this.BookData);
        if (this.BookData != null) {
          //this.goToDisplay();
          this.goToMultirez();
        } else {
          window.alert(this.error )
        }
      });

    // this.getResponse(url).subscribe((res) => {
    //   this.BookData = res.items[0].volumeInfo;
    // },
    //   (err) => {
    //     console.log(err)
    //     return
    //   },
    //   () => {
    //     this.goToDisplay();
    //   });

    this.bm = 0;
  }

  private key: string = "517fc0c5";
  //private apiKey: string = "02f89b2584b78aa77171c14740eba5a9";
  //private url: string = "https://api.themoviedb.org/3/search/movie?api_key="
  generateMovieURL(query: string) {
    var url: string = "http://www.omdbapi.com/?s=" + query + "&apikey=" + this.key + "&plot=full&type=movie"  ;
    //var url: string = this.url + this.apiKey + "&query=" + query;
    this.search = query;
    this.getResponse(url).subscribe((res) => {
      this.MovieData = res.Search;
    },
      (err) => {
        console.log(err)
      },
      () => {
        console.log("Movies Found: ", this.MovieData);
        if (this.MovieData != null) {
          //this.goToDisplay();
          this.goToMultirez();
        } else {
          window.alert(this.error);
        }
      });

    // this.getResponse(url).subscribe((res) => {
    //     this.MovieData = res;
    // },
    //   (err) => {
    //     console.log(err);
    //   },
    //   () => {
    //     this.goToDisplay();
    //   });

    this.bm = 1;
  }

  getResponse(url: string) {
    //console.log(url);
    // setTimeout(() => { this.goToDisplay(); }, 2000);
    // this.goToDisplay();
    return this.http.get<any>(url)
  }

  title;
  goToDisplay(index: number, title?) {
    this.index = index;
    this.title = title;
    if (this.bm == 0) {
      this.router.navigate(['display']); 
    }
    else if (this.bm == 1) {
      this.router.navigate(['displaym']);
    }

  }

  goToMultirez() {
    this.router.navigate(['multirez']);
  }

}