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
  pageSizes: number[] = [5, 10, 15, 20];
  dropdownOpen: boolean = false;

  booksService = inject(BookServiceService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
  
    this.fetchBooks(); 
  }


  fetchBooks(query: string = this.searchQuery.trim()?'':'%7Bsearch') {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    console.log(`Fetching books with query: ${query} | Page: ${this.currentPage} | StartIndex: ${startIndex}`);
   
    this.booksService
      .getBooks(query, this.pageSize, startIndex) 
      .subscribe({
        next: (data) => {
          console.log('API response:', data); 
          if (data.totalItems > 0) {
   
            if (this.currentPage === 1) {
              this.totalItems = data.totalItems;
            }
            
            this.books = data.items.map((item: any) => ({
              title: item.volumeInfo?.title || 'No Title',
              authors: item.volumeInfo?.authors || ['Unknown'],
              description: item.volumeInfo?.description || 'No Description',
              categories: item.volumeInfo?.categories || ['N/A'],
              publishedDate: item.volumeInfo?.publishedDate || 'Unknown',
              imageLinks: item.volumeInfo?.imageLinks || {},
            }));

          
              this.filteredBooks = this.books;
           
          } else {
            console.log('No results found for your search.');
            this.filteredBooks = []; 
          }
        },
        error: (err) => {
          console.error('Error fetching books:', err);
        },
      });
  }


  filterBooks() {}

  
  changePage(direction: number) {
   
    this.currentPage += direction;
    this.fetchBooks(this.searchQuery.trim()?this.searchQuery:'%7Bsearch'); 
  }

  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  
  setPageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1; 
    this.fetchBooks(this.searchQuery); 
    this.dropdownOpen = false; 
  }

 
  onSearch() {
    if (!this.searchQuery.trim()) {
      this.searchQuery = '%7Bsearch';
    }
    
    this.currentPage = 1; 
    this.fetchBooks(this.searchQuery); 
  }
}
