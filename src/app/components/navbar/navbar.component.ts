import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen = false; // Variable to track the state of the menu

  // Toggle the mobile menu state
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
