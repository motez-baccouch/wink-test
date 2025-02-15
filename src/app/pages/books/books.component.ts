import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BookServiceService],
})
export class BooksComponent {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  booksService = inject(BookServiceService);
  cdr = inject(ChangeDetectorRef);  // Inject ChangeDetectorRef

  ngOnInit() {
    this.fetchBooks(); // Fetch books when the component is initialized
  }

  fetchBooks() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.booksService
      .getBooks(`%7Bsearch&maxResults=${this.pageSize}&startIndex=${startIndex}`)
      .subscribe({
        next: (data) => {
          if (this.currentPage === 1) {
            this.totalItems = data.totalItems;
          }
          this.books = data.items.map((item: any) => item.volumeInfo);
          this.applySearch();

        },
        error: (err) => console.error('Error fetching books:', err),
      });
  }

  filterBooks() {
    this.applySearch();
  }

  applySearch() {
    if (this.searchQuery) {
      this.filteredBooks = this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredBooks = [...this.books];
    }
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.fetchBooks(); // Fetch new set of books for the next page
  }

 
}
