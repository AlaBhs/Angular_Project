import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { HallOfFameComponent } from './pages/hall-of-fame/hall-of-fame.component';
import { OnThisDayComponent } from './pages/on-this-day/on-this-day.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: 'hall-of-fame', component: HallOfFameComponent },
  { path: 'on-this-day', component: OnThisDayComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];

