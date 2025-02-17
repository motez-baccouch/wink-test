import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  imports:[CommonModule]
})
export class SwiperComponent implements AfterViewInit {
  @Input() books: any[] = [];

  ngAfterViewInit(): void {
    new (window as any).Swiper('.swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
