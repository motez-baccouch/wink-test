import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
  imports: [CommonModule, FormsModule]
})
export class FrontPageComponent {
  
  public searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/books'], { queryParams: { search: this.searchQuery } });
    }
  }
}
