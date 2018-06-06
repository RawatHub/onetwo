import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http' ;


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { MoviesComponent } from './movies/movies.component';
import { RequestAPIService } from './request-api.service';
import { DisplayComponent } from './display/display.component';
import { DisplaymComponent } from './displaym/displaym.component';
import { MultirezComponent } from './multirez/multirez.component'

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    MoviesComponent,
    DisplayComponent,
    DisplaymComponent,
    MultirezComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RequestAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
