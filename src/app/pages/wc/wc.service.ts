import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';
import { GroqService } from './groq.service';

@Injectable({
  providedIn: 'root'
})

export class WcService {

  private selectedYearSubject = new BehaviorSubject<number | null>(null);
  selectedYear$ = this.selectedYearSubject.asObservable();


  private groqService: any;
  private csvUrl = 'https://raw.githubusercontent.com/NouiraTaher/FootballTrivia/refs/heads/main/worldcups.csv';
  private wcsUrl = 'http://localhost:3000/query-csv?csvFile=worldcups.csv';  
  private wcMatchesUrl = 'http://localhost:3000/query-csv?csvFile=matchesWC.csv';  
  constructor(private http: HttpClient, private injector : Injector) {
    if (!this.groqService) {
      this.groqService = this.injector.get(GroqService);
    }
  }
  selectYear(year: number) {
    this.selectedYearSubject.next(year);
  }

  // Method to reset the selection (go back to list view)
  resetSelectedYear() {
    this.selectedYearSubject.next(null);  // This will make the matches component disappear
  }
  getWorldCups(): Observable<any[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map(data => {
        const parsedData = Papa.parse(data, { header: true });
        return parsedData.data.filter((row: any) => row.year); // Filter out any empty rows
      })
    );
  }
  getStat(question: string): Observable<any> {

    return this.groqService.getStat(question);
  }
  generateQuestions()
  {
    return this.groqService.generateQuestions();
  }
  getMatchesData(): Observable<any> {
    return this.http.get(this.wcMatchesUrl);  // Make the GET request to the backend
  }

fetchKnockOutMatchesByYear(year: number): Observable<any> {
  return this.http.get(`${this.wcMatchesUrl}&filterColumns=year&filterValues=${year}&excludeColumn=stage&excludeValues=group,preliminary`);
  ;
}
}
