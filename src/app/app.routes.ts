import { Routes } from '@angular/router';
import { BookDetailComponent } from './pages/book-details/book-details.component';
import { BooksComponent } from './pages/books/books.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';

export const routes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'books', component: BooksComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: '**', redirectTo: '' }  
];
