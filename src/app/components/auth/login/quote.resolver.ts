import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; // Import the AuthService
import { Quote } from '../../../pages/home/classes/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteResolver implements Resolve<Quote> {
  constructor(private authService: AuthService) {}

  resolve(): Observable<Quote> {
    return this.authService.getRandomQuote(); // Fetch the random quote
  }
}