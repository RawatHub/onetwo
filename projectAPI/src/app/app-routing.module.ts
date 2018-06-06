import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { MoviesComponent } from './movies/movies.component'
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { DisplaymComponent } from './displaym/displaym.component'
import { MultirezComponent } from './multirez/multirez.component';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent
  },

  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'display',
    component: DisplayComponent
  },
  {
    path: 'displaym',
    component: DisplaymComponent
  },
  {
    path: 'multirez',
    component: MultirezComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
