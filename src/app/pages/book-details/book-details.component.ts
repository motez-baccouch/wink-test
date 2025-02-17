import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { SwiperComponent } from '../../components/swiper/swiper.component';

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
  book: any;
  similarBooks: any[] = [];
  isDescriptionExpanded = false;
  maxDescriptionLength = 200; // Limit for the visible description
  bookISBN: string = '';  // New variable for ISBN

  router = inject(Router);

  constructor(private location: Location) {
    const state = this.location.getState() as any;
    this.book = state.book || null;
    this.similarBooks = state.similarBooks || [];
  
    // Remove the current book from the similarBooks list
    if (this.book) {
      this.similarBooks = this.similarBooks.filter(b => b.title !== this.book.title);
    }
  
    // Set ISBN (handling logic inside the component)
    if (this.book?.industryIdentifiers?.length > 0) {
      this.bookISBN = this.book?.industryIdentifiers?.map((id: IndustryIdentifier) => id.identifier).join(', ');
    } else {
      this.bookISBN = 'No ISBN available';
    }
  }
  

  goBack() {
    this.router.navigate(['/books']);
  }

  viewBookDetails(similarBook: any) {
    this.router.navigate(['/book-detail'], { state: { book: similarBook } });
  }

  // Toggle description view
  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }
}
