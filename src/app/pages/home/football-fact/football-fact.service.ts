// football-fact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FootballFact } from '../classes/football-fact';

@Injectable({
  providedIn: 'root',
})
export class FootballFactService {

  private cachedFact: any;

  constructor(private http: HttpClient) {}

  // Get the fact for the current date
  getFactForToday(): Observable<FootballFact | null> {
    if(this.cachedFact){
      return of(this.cachedFact);
    }
    else{
      const today = this.getCurrentDate(); // Get today's date in "MM-DD" format

      return this.http.get<FootballFact[]>('/api/onThisDayFacts').pipe(
        switchMap((onThisDayFacts) => {
          // Find an "On This Day" fact for today
          const factForToday = onThisDayFacts.find((fact) => fact.date === today);

          if (factForToday) {
            this.cachedFact = factForToday;
            return of(factForToday); // Return the "On This Day" fact
          } else {
            // If no "On This Day" fact, check the random football facts
            return this.http.get<FootballFact[]>('/api/randomFootballFacts').pipe(
              map((randomFootballFacts) => {
                const randomFactForToday = randomFootballFacts.find((fact) => fact.date === today);
                if (randomFactForToday) {
                  // Set the date to null for random facts
                  randomFactForToday.date = ''; // Safe to modify since randomFactForToday is defined
                  this.cachedFact = randomFactForToday ;
                  return randomFactForToday;
                } else {
                  return null; // Return null if no fact exists for today
                }
              })
            );
          }
        })
      );
    }
  }

  // Get the current date in "MM-DD" format
  private getCurrentDate(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  }
}