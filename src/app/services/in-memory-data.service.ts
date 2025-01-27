import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { USERS } from '../pages/home/data/users';
import { QUESTIONS } from '../pages/home/data/questions';
import { ON_THIS_DAY_FACTS } from '../pages/home/data/on-this-day';
import { RANDOM_FOOTBALL_FACTS } from '../pages/home/data/random-football-facts';
import { QUOTES } from '../pages/home/data/quotes';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      users: USERS,
      questions: QUESTIONS,
      onThisDayFacts: ON_THIS_DAY_FACTS,
      randomFootballFacts: RANDOM_FOOTBALL_FACTS,
      quotes: QUOTES,
    };
  }
}
