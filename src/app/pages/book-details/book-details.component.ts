import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { SwiperComponent } from '../../components/swiper/swiper.component';
import { Book } from '../../models/book.model';

// Define the type for the 'industryIdentifiers' array items
interface IndustryIdentifier {
  type: string;
  identifier: string;
}

@Component({
  standalone: true,
  selector: 'app-book-detail',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  imports: [CommonModule, SwiperComponent],
})
export class BookDetailComponent {
  public book: Book;
  public similarBooks: any[] = [];
  public isDescriptionExpanded = false;
  public maxDescriptionLength = 200; 
  public bookISBN: string = '';  

  private router = inject(Router);

  constructor(private location: Location) {
    const state = this.location.getState() as any;
    this.book = state.book || null;
    this.similarBooks = state.similarBooks || [];
  
    if (this.book) {
      this.similarBooks = this.similarBooks.filter(b => b.title !== this.book.title);
    }

    if (this.book && this.book.industryIdentifiers && this.book.industryIdentifiers.length > 0) {
      this.bookISBN = this.book.industryIdentifiers.map((id: IndustryIdentifier) => id.identifier).join(', ');
    } else {
      this.bookISBN = 'No ISBN available';
    }
    
  }
  

  public goBack() {
    this.router.navigate(['/books']);
  }

  public viewBookDetails(similarBook: any) {
    this.router.navigate(['/book-detail'], { state: { book: similarBook } });
  }

  public toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }
}
