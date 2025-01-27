// leaderboard.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor() {}

  // Fetch top 10 users who have played today
  getTopUsers(): User[] {
    const users: User[] = [];

    // Loop through localStorage to find all users
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('user-')) {
        const userJson = localStorage.getItem(key);
        if (userJson) {
          const user: User = JSON.parse(userJson);
          if (user.hasPlayedToday) {
            users.push(user); // Add users who have played today
          }
        }
      }
    }

    // Sort users by score in descending order
    return users.sort((a, b) => b.score - a.score).slice(0, 10); // Return top 10 users
  }

  private leaderboardSubject = new BehaviorSubject<User[]>([]);
  leaderboard$ = this.leaderboardSubject.asObservable(); // Observable for the leaderboard

  // Fetch and update the leaderboard
  refreshLeaderboard() {
    this.resetLeaderboardForNewDay(); // Reset for a new day
    const topUsers = this.getTopUsers();
    this.leaderboardSubject.next(topUsers); // Notify subscribers
  }


   // Reset the leaderboard for a new day
   resetLeaderboardForNewDay() {
    const today = this.getCurrentDate();

    // Loop through localStorage to find all users
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('user-')) {
        const userJson = localStorage.getItem(key);
        if (userJson) {
          const user: User = JSON.parse(userJson);
          if (user.lastPlayedDate !== today) {
            // Reset hasPlayedToday and score for a new day
            user.hasPlayedToday = false;
            user.score = 0;
            user.lastPlayedDate = today;
            localStorage.setItem(key, JSON.stringify(user));
          }
        }
      }
    }
  }

  // Get the current date in YYYY-MM-DD format (local time)
  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}