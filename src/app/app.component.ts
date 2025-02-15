import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BooksComponent } from './pages/books/books.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , BooksComponent , HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wink-test';
}
