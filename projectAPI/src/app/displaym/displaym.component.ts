import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service'

@Component({
  selector: 'app-displaym',
  templateUrl: './displaym.component.html',
  styleUrls: ['./displaym.component.css']
})
export class DisplaymComponent implements OnInit {

  constructor(private getApi: RequestAPIService) { }

  MovieDetails;
  MovieArray;
  index;
  title;
  private key: string = "517fc0c5";

  ngOnInit() {
    this.index = this.getApi.index;
    this.title = this.getApi.title;

    // this.MovieDetails = this.getApi.MovieData;

    var url: string = "http://www.omdbapi.com/?t=" + this.title + "&plot=full&type=movie" + "&apikey=" + this.key;

    this.getApi.getResponse(url)
      .subscribe((res) => {
        this.MovieDetails = res;
      },
        (err) => {
          console.log(err);
        },
        () => {
          console.log("Movie Selected: ", this.MovieDetails);
          this.MovieArray = {
            mtitle: this.MovieDetails.Title,
            actors: this.MovieDetails.Actors,
            boxOffice: this.MovieDetails.BoxOffice,
            rating: (this.MovieDetails.Ratings.length == 2 ? this.MovieDetails.Ratings[1].Value : this.MovieDetails.Ratings.Value),
            plot: this.MovieDetails.Plot,
            mimgURL: this.MovieDetails.Poster,
            year: this.MovieDetails.Year,
            director: this.MovieDetails.Director,
            lang: this.MovieDetails.Language
          }
        }
      )
  }

}
