import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { User } from '../classes/user';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [NgClass], // Add NgClass to the imports array
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  topUsers: User[] = []; // Store the top users
  currentUserUsername: string | null = null; // Store the current user's username

  constructor(
    private leaderboardService: LeaderboardService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    // Get the current user's username
    this.currentUserUsername = this.authService.getCurrentUser()?.username || null;

    // Subscribe to the leaderboard observable
    this.leaderboardService.leaderboard$.subscribe((users) => {
      // Only take the top 5 users
      this.topUsers = users.slice(0, 5);
    });

    // Fetch the initial leaderboard data
    this.leaderboardService.refreshLeaderboard();
  }
}