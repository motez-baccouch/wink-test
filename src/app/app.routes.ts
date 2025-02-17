import { Routes } from '@angular/router';
import { BookDetailComponent } from './pages/book-details/book-details.component';
import { BooksComponent } from './pages/books/books.component';

export const routes: Routes = [
    { path: 'books', component: BooksComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: '', redirectTo: 'books', pathMatch: 'full' },  // ✅ Ensure no starting `/`
    { path: '**', redirectTo: 'books' }  // ✅ Catch-all redirect
];
