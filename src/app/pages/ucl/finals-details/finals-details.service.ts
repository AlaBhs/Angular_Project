import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Final } from '../dto/finals-item.dto';

@Injectable({
    providedIn: 'root',
  })
  export class FinalsDetailsService {
    private uclFinalsUrl = 'http://localhost:3000/query-csv?csvFile=uclFinals.csv';  
    private filterValue: string = '';
    private sortOption: string = '';
    private finalsData: Final[] = [];
  
    constructor(private http: HttpClient) {}
  
    fetchFinalsData(): Observable<Final[]> {
      return this.http.get<any[]>(this.uclFinalsUrl).pipe(
        map(data =>
          data.map(item => ({
            attendance: item['attendance'],
            finalCity: item['final-city'],
            finalCountry: item['final-country'],
            runnerUp: item['runner-up'],
            runnerUpCountry: item['runner-up-country'],
            score: item['score'],
            season: item['season'],
            stadium: item['stadium'],
            winner: item['winner'],
            winnerCountry: item['winner-country'],
            winningWay: item['winning-way'],
          }))
        )
      );
    }
  
    setFilter(filter: string): void {
      this.filterValue = filter;
    }
  
    setSort(sort: string): void {
      this.sortOption = sort;
    }
  
    getFilter(): string {
      return this.filterValue;
    }
  
    getSort(): string {
      return this.sortOption;
    }
  
    getFilteredAndSortedFinals(): Observable<Final[]> {
      if (this.finalsData.length === 0) {
        return this.fetchFinalsData().pipe(
          map(data => {
            this.finalsData = data;
            return this.applyFilterAndSort();
          })
        );
      } else {
        return of(this.applyFilterAndSort());
      }
    }
  
    private applyFilterAndSort(): Final[] {
      const filtered = this.filterFinals(this.filterValue, this.finalsData);
      return this.sortFinals(this.sortOption, filtered);
    }
  
    private filterFinals(searchTerm: string, finals: Final[]): Final[] {
      if (!searchTerm) return finals;
      const lowerCaseSearch = searchTerm.toLowerCase();
      return finals.filter(
        (final) =>
          final.season.toString().includes(lowerCaseSearch) ||
          (final.winner && final.winner.toLowerCase().includes(lowerCaseSearch)) ||
          (final.runnerUp &&
            final.runnerUp.toLowerCase().includes(lowerCaseSearch))
      );
    }
  
    private sortFinals(sortOption: string, finals: Final[]): Final[] {
      switch (sortOption) {
        case 'oldest': {
          return finals.sort(
            (a, b) => parseInt(a.season.slice(0, 4)) - parseInt(b.season.slice(0, 4))
          );
        }
        case 'newest': {
          return finals.sort(
            (a, b) => parseInt(b.season.slice(0, 4)) - parseInt(a.season.slice(0, 4))
          );
        }
        case 'mostGoals': {
          return finals.sort(
            (a, b) => this.getTotalGoals(b.score) - this.getTotalGoals(a.score)
          );
        }
        case 'mostAttendance': {
          return finals.sort(
            (a, b) => parseInt(b.attendance || '0') - parseInt(a.attendance || '0')
          );
        }
        default:
          return finals;
      }
    }
  
    private getTotalGoals(score: string): number {
      if (!score) return 0;
      try {
        const scores = score.split(/[-–;]/).map((num) => parseInt(num.trim()) || 0);
        return scores.reduce((total, value) => total + value, 0);
      } catch {
        return 0; // Fallback for unexpected errors
      }
    }
  }
  