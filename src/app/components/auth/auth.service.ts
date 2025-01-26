import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../../pages/home/classes/user';
import { Quote } from '../../pages/home/classes/quote'; // Import the Quote class

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private quotesCache: Quote[] | null = null; // Cache for quotes
  private loggedIn = new BehaviorSubject<boolean>(this.getInitialLoginStatus());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromStorage());

  constructor(private http: HttpClient, private router: Router) {}

  // Get the current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Login the user
  login(username: string, password: string) {
    return this.http.get<any[]>('/api/users').subscribe((users) => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        // Check if the user's data exists in localStorage
        const storedUser = this.getUserFromLocalStorage(username);
        if (storedUser) {
          // Restore the user's data from localStorage
          this.loggedIn.next(true);
          this.currentUserSubject.next(storedUser);
        } else {
          // Save the user's data to localStorage
          this.loggedIn.next(true);
          this.currentUserSubject.next(user);
          localStorage.setItem(`user-${username}`, JSON.stringify(user));
        }
        localStorage.setItem('currentUser', username); // Store the username of the logged-in user
        localStorage.setItem('isLoggedIn', 'true'); // Save login status in local storage
        this.router.navigate(['/home']); // Redirect to a protected route
      } else {
        alert('Invalid credentials');
      }
    });
  }

  // Logout the user
  logout() {
    const currentUser = this.getCurrentUser();
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
    localStorage.removeItem('currentUser'); // Remove the current user's username
    this.router.navigate(['/login']);
  }

  // Observable to track login status
  isLoggedIn = this.loggedIn.asObservable();

  // Get initial login status from local storage
  private getInitialLoginStatus(): boolean {
    const loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn === 'true'; // Convert string to boolean
  }

  // Get current user from local storage
  private getCurrentUserFromStorage(): User | null {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUserUsername = localStorage.getItem('currentUser'); // Get the username of the logged-in user

    if (isLoggedIn === 'true' && currentUserUsername) {
      // Fetch the user data using the stored username
      const userJson = localStorage.getItem(`user-${currentUserUsername}`);
      if (userJson) {
        return JSON.parse(userJson);
      }
    }
    return null;
  }

  // Get user data from localStorage
  private getUserFromLocalStorage(username: string): User | null {
    const userJson = localStorage.getItem(`user-${username}`);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Method to get a random quote
  getRandomQuote(): Observable<Quote> {
    if (this.quotesCache) {
      // If quotes are already cached, return a random quote from the cache
      const randomIndex = Math.floor(Math.random() * this.quotesCache.length);
      return of(this.quotesCache[randomIndex]);
    } else {
      // If quotes are not cached, fetch them from the server
      return this.http.get<Quote[]>('/api/quotes').pipe(
        tap((quotes) => {
          this.quotesCache = quotes; // Save quotes to cache
        }),
        map((quotes) => {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          return quotes[randomIndex]; // Return a random quote
        })
      );
    }
  }
}