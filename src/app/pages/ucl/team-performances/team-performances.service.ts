import { Injectable } from '@angular/core';
import { Club } from '../dto/ucl-club-details.dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private uclTeamsUrl = 'http://localhost:3000/query-csv?csvFile=matchesWC.csv';  
  private clubs: Club[] = [
    {
      position: 1,
      name: 'Real Madrid CF',
      country: 'ESP',
      participated: 53,
      titles: 14,
      played: 476,
      win: 285,
      draw: 81,
      loss: 110,
      goalsFor: 1047,
    },
    {
      position: 2,
      name: 'FC Bayern München',
      country: 'GER',
      participated: 39,
      titles: 6,
      played: 382,
      win: 229,
      draw: 76,
      loss: 77,
      goalsFor: 804,
    },
    {
      position: 3,
      name: 'FC Barcelona',
      country: 'ESP',
      participated: 33,
      titles: 5,
      played: 339,
      win: 197,
      draw: 76,
      loss: 66,
      goalsFor: 667,
    },
    {
      position: 4,
      name: 'Manchester United',
      country: 'ENG',
      participated: 30,
      titles: 3,
      played: 293,
      win: 160,
      draw: 69,
      loss: 64,
      goalsFor: 533,
    },
    {
      position: 5,
      name: 'Juventus',
      country: 'ITA',
      participated: 37,
      titles: 2,
      played: 301,
      win: 153,
      draw: 70,
      loss: 78,
      goalsFor: 479,
    },
    {
      position: 6,
      name: 'Arsenal FC',
      country: 'ENG',
      participated: 21,
      titles: 0,
      played: 201,
      win: 101,
      draw: 43,
      loss: 57,
      goalsFor: 332,
    },
    {
      position: 7,
      name: 'Club Atlético de Madrid',
      country: 'ESP',
      participated: 18,
      titles: 0,
      played: 160,
      win: 76,
      draw: 42,
      loss: 42,
      goalsFor: 226,
    },
    {
      position: 8,
      name: 'RSC Anderlecht',
      country: 'BEL',
      participated: 34,
      titles: 0,
      played: 200,
      win: 70,
      draw: 44,
      loss: 86,
      goalsFor: 282,
    },
    {
      position: 9,
      name: 'Paris Saint-Germain',
      country: 'FRA',
      participated: 16,
      titles: 0,
      played: 143,
      win: 77,
      draw: 27,
      loss: 39,
      goalsFor: 283,
    },
  ];  

  getClubs(): Observable<Club[]> {
    return of(this.clubs);
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
