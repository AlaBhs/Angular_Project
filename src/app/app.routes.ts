import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { HallOfFameComponent } from './pages/hall-of-fame/hall-of-fame.component';
import { OnThisDayComponent } from './pages/on-this-day/on-this-day.component';
import { UclComponent } from './pages/ucl/ucl.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FinalsDetailsComponent } from './pages/ucl/finals-details/finals-details.component';
import { TeamPerformancesComponent } from './pages/ucl/team-performances/team-performances.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FootballFactResolver } from './pages/home/football-fact/football-fact.resolver';
import { QuoteResolver } from './components/auth/login/quote.resolver';

export const routes: Routes = [
  { path: '',
     component: HomeComponent ,
     resolve: {
        fact: FootballFactResolver, // Resolve data before activating the route
    },
  },
  { path: 'timeline', component: TimelineComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: 'hall-of-fame', component: HallOfFameComponent },
  { path: 'on-this-day', component: OnThisDayComponent },
  { path: 'ucl', component: UclComponent },
  { path: 'ucl/finals', component: FinalsDetailsComponent },
  { path: 'ucl/performances', component: TeamPerformancesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login',
     component: LoginComponent,
     resolve : {
      quote : QuoteResolver
     } },
  { path: '**', redirectTo: '' },
];
