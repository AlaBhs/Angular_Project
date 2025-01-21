import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
 

}
