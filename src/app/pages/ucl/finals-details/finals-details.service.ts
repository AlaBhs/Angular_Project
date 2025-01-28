import { Injectable } from '@angular/core';
import { Club } from '../dto/ucl-club-details.dto';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FinalsDetailsService {
  private uclFinalsUrl = 'http://localhost:3000/query-csv?csvFile=ucl-finals.csv';  
  private clubs: Club[] = [] ;
  constructor(private http: HttpClient,)
  {}
  
  getFinalsData(): Observable<any> {
    return this.http.get(this.uclFinalsUrl);  // Make the GET request to the backend
  }

  onSearchAndFilter(searchTerm: string, country: string): Observable<Club[]> {
    return of(
      this.clubs.filter((club) => 
        (club.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        club.country.toLowerCase().includes(country.toLowerCase()))
      )
    );
  }

  getClubById(position: string | null): Observable<Club | undefined> {
    const club = this.clubs.find((club) => club.position.toString() === position);
    return of(club);
  }
}
