import { Injectable } from '@angular/core';
import { Club } from '../dto/ucl-club-details.dto';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  // http://localhost:3000/query-csv?csvFile=your_csv_file.csv&filterColumns=column1,column2&filterValues=value1,value2&excludeColumn=column3&excludeValues=excludeSubstring1,excludeSubstring2&sortColumn=columnName&sortOrder=ASC&page=1&pageSize=10
  private readonly uclClubsUrl =
    'http://localhost:3000/query-csv?csvFile=AllTimeRankingByClub.csv&sortColumn=Titles&sortOrder=DESC&pageSize=10';

  private currentPage: number = 1; // Track the current page
  private clubsSubject = new BehaviorSubject<Club[]>([]); // BehaviorSubject to manage and emit club data
  private isFetching = false; // Prevent multiple concurrent fetches

  constructor(private http: HttpClient) {}

  // Observable for club data
  get clubs$(): Observable<Club[]> {
    return this.clubsSubject.asObservable();
  }

  // Fetch clubs from the server
  private fetchClubsData(page: number): Observable<Club[]> {
    const url = `${this.uclClubsUrl}&page=${page}`;
    return this.http.get<any[]>(url).pipe(
      map((data) => {
        console.log('API Response:', data); // Add this log
        return data.map((item) => ({
          position: item['Position'],
          name: item['Club'],
          country: item['Country'],
          participated: item['Participated'],
          titles: item['Titles'],
          played: item['Played'],
          win: item['Win'],
          draw: item['Draw'],
          loss: item['Loss'],
          goalsFor: item['Goals For'],
          goalsAgainst: item['Goals Against'],
          pts: item['Pts'],
        }));
      }),
      catchError((error) => {
        console.error('Error fetching clubs:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  // Load initial data or more clubs
  loadMoreClubs(): Observable<Club[]> {
    if (this.isFetching) {
      return of([]); // Prevent duplicate calls
    }
    this.isFetching = true;

    return this.fetchClubsData(this.currentPage).pipe(
      map((newClubs) => {
        console.log('New Clubs Fetched:', newClubs); // Add this log
        const updatedClubs = [...this.clubsSubject.value, ...newClubs];
        this.clubsSubject.next(updatedClubs); // Emit updated data
        console.log('Updated Club List:', updatedClubs); // Add this log
        this.currentPage++;
        this.isFetching = false;
        return newClubs;
      }),
      catchError((error) => {
        console.error('Error loading more clubs:', error);
        this.isFetching = false;
        return of([]);
      })
    );
  }

  // Get club by position
  getClubById(position: string | null): Observable<Club | undefined> {
    if (!position) {
      return of(undefined);
    }
    const club = this.clubsSubject.value.find(
      (club) => club.position.toString() === position
    );
    return of(club);
  }





  private buildQueryUrl(
    csvFile: string,
    filterColumns: string[],
    filterValues: string[],
    excludeColumn?: string,
    excludeValues?: string[],
    sortColumn: string = 'Titles',
    sortOrder: string = 'DESC',
    page: number = 1,
    pageSize: number = 10
  ): string {
    let query = `http://localhost:3000/query-csv?csvFile=${csvFile}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`;
  
    if (filterColumns.length && filterValues.length) {
      query += `&filterColumns=${filterColumns.join(',')}&filterValues=${filterValues.join(',')}`;
    }
  
    if (excludeColumn && excludeValues?.length) {
      query += `&excludeColumn=${excludeColumn}&excludeValues=${excludeValues.join(',')}`;
    }
  
    return query;
  }
  
  onSearchAndFilter(
    searchTerm: string,
    country: string,
    csvFile: string = 'AllTimeRankingByClub.csv'
  ): Observable<Club[]> {
    const filterColumns = [];
    const filterValues = [];
  
    // Add filters dynamically
    if (searchTerm) {
      filterColumns.push('Club');
      filterValues.push(searchTerm);
    }
  
    if (country) {
      filterColumns.push('Country');
      filterValues.push(country);
    }
  
    const url = this.buildQueryUrl(
      csvFile,
      filterColumns,
      filterValues,
      undefined, // No excludeColumn
      undefined, // No excludeValues
      'Titles',
      'DESC'
    );
  
    console.log('Filtering with URL:', url);
  
    return this.http.get<any[]>(url).pipe(
      map((data) =>
        data.map((item) => ({
          position: item['Position'],
          name: item['Club'],
          country: item['Country'],
          participated: item['Participated'],
          titles: item['Titles'],
          played: item['Played'],
          win: item['Win'],
          draw: item['Draw'],
          loss: item['Loss'],
          goalsFor: item['Goals For'],
          goalsAgainst: item['Goals Against'],
          pts: item['Pts'],
        }))
      )
    );
  }
}