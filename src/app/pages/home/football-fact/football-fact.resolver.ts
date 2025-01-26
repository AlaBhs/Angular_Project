import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FootballFactService } from './football-fact.service';
import { FootballFact } from '../classes/football-fact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FootballFactResolver implements Resolve<FootballFact | null> {
  constructor(private footballFactService: FootballFactService) {}

  resolve(): Observable<FootballFact | null> {
    return this.footballFactService.getFactForToday(); // Fetch the fact
  }
}