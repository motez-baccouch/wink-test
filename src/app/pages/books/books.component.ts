import { Component, inject, ChangeDetectorRef, Input } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BookServiceService],
})
export class BooksComponent {
  @Input() searchQuery: string = ''; 
  
  public books: Book[] = [];
  public filteredBooks: Book[] = [];
  public currentPage: number = 1;
  public pageSize: number = 10;  
  public totalItems: number = 0;
  public pageSizes: number[] = [5, 10, 15, 20];
  public dropdownOpen: boolean = false;

  private booksService = inject(BookServiceService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const queryParam = params['query']; 
      if (queryParam) {
        this.searchQuery = queryParam;  
      }
      this.fetchBooks(this.searchQuery.trim()?this.searchQuery:'search'); 
    });
  }

  public changePage(direction: number) {
    this.currentPage += direction;
    this.fetchBooks(this.searchQuery.trim() ? this.searchQuery : 'search');
  }

  public toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public setPageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.fetchBooks(this.searchQuery.trim() ? this.searchQuery : 'search');
    this.dropdownOpen = false;
  }

  public onSearch() {
    this.router.navigate([], {
      queryParams: { query: this.searchQuery },
      queryParamsHandling: 'merge',  
    });
  }

  public viewBookDetails(book: any) {
    this.router.navigate(['/book-detail'], { state: { book, similarBooks: this.books.slice(0, 10) } });
  }

  public goBack() {
    this.router.navigate(['/']);
  }

  private fetchBooks(query: string = this.searchQuery.trim() ? this.searchQuery : 'search') {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    
    this.booksService
      .getBooks(query, this.pageSize, startIndex) 
      .subscribe({
        next: (data) => {
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
}
