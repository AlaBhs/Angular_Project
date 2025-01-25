import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';
import { GroqService } from './groq.service';

@Injectable({
  providedIn: 'root'
})

export class WcService {
  private groqService: any;
  private csvUrl = 'https://raw.githubusercontent.com/NouiraTaher/FootballTrivia/refs/heads/main/worldcups.csv';
  private wcsUrl = 'http://localhost:3000/query-csv?csvFile=worldcups.csv';  
  private wcMatchesUrl = 'http://localhost:3000/query-csv?csvFile=matchesWC.csv';  
  constructor(private http: HttpClient, private injector : Injector) {
    if (!this.groqService) {
      this.groqService = this.injector.get(GroqService);
    }
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

  fetchMatchesByYear(year: number): Observable<any> {
    const filterColumn = 'year'; // The column you want to filter on
    const filterValue = year.toString(); // Convert the year to a string
  
    const params = new HttpParams()
      .set('filterColumn', filterColumn)
      .set('filterValue', filterValue); // Add filter parameters
  
    return this.http.get(this.wcMatchesUrl, { params });
  }
  
 

}
