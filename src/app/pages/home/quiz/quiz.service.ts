import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizQuestion } from '../classes/quizquestion';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private shuffledQuestions: QuizQuestion[] = [];
  private shuffleDate: string | null = null;

  constructor(private http: HttpClient) {}

  // Fetch questions and shuffle them daily
  getDailyQuestions(): Observable<QuizQuestion[]> {
    const today = this.getCurrentDate(); // Use the new method

    if (this.shuffleDate === today && this.shuffledQuestions.length > 0) {
      return of(this.shuffledQuestions);
    }

    return this.http.get<QuizQuestion[]>('/api/questions').pipe(
      map((questions) => {
        this.shuffledQuestions = this.shuffleQuestions(questions, today);
        this.shuffleDate = today;
        return this.shuffledQuestions;
      })
    );
  }

  // Get the current date in YYYY-MM-DD format (local time)
  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Shuffle questions using a seed (date) for consistent shuffling
  private shuffleQuestions(questions: QuizQuestion[], seed: string): QuizQuestion[] {
    const shuffled = [...questions];
    const seedNumber = this.seedStringToNumber(seed);

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.seededRandom(i + 1, seedNumber));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Convert a seed string to a number
  private seedStringToNumber(seed: string): number {
    return seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  // Generate a seeded random number
  private seededRandom(max: number, seed: number): number {
    const x = Math.sin(seed++) * 10000;
    return (x - Math.floor(x)) * max;
  }

  // Check if the selected answer is correct
  checkAnswer(question: QuizQuestion, selectedAnswer: string): boolean {
    return question.correctAnswer === selectedAnswer;
  }

  // Check if the user has played today
  hasUserPlayedToday(username: string): boolean {
    const user = this.getUserFromLocalStorage(username);
    if (user) {
      const lastPlayedDate = user.lastPlayedDate;
      const today = this.getCurrentDate();
      if (lastPlayedDate !== today) {
        user.hasPlayedToday = false;
        user.lastPlayedDate = today;
        this.saveUserToLocalStorage(username, user);
      }
      return user.hasPlayedToday;
    }
    return false;
  }

  // Save the user's score and mark them as having played today
  saveUserScore(username: string, score: number): void {
    const user = this.getUserFromLocalStorage(username);
    if (user) {
      user.score = score;
      user.hasPlayedToday = true;
      user.lastPlayedDate = this.getCurrentDate();
      this.saveUserToLocalStorage(username, user);
    }
  }

  // Get user data from localStorage
  private getUserFromLocalStorage(username: string): User | null {
    const userJson = localStorage.getItem(`user-${username}`);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Save user data to localStorage
  private saveUserToLocalStorage(username: string, user: User): void {
    localStorage.setItem(`user-${username}`, JSON.stringify(user));
  }
}