import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports : [CommonModule,],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  currentSlide = 0;
  totalSlides = 3; // Adjust according to your number of slides

  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.totalSlides - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.totalSlides - 1) ? 0 : this.currentSlide + 1;
  }
}


