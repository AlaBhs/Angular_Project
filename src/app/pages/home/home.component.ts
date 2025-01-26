import { Component, OnInit } from '@angular/core';
import { DailyQuizComponent } from "./quiz/quiz.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { FootballFactComponent } from "./football-fact/football-fact.component";
import { IntroductionComponent } from "./introduction/introduction.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DailyQuizComponent, LeaderboardComponent, FootballFactComponent, IntroductionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardService.resetLeaderboardForNewDay(); // Reset the leaderboard for a new day
  }

}
