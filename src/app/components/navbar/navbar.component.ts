import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemesService } from '../../services/themes.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isDarkMode: boolean = false;
  isLoggedIn: boolean = false; // Track login status

  constructor(private themesService: ThemesService , private authService : AuthService) {}

  ngOnInit() {
    const currentTheme = this.themesService.getCurrentTheme();
    this.isDarkMode = currentTheme === 'dark';

    // Subscribe to login status changes
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  toggleTheme() {
    this.themesService.toggleTheme();
    this.isDarkMode = this.themesService.getCurrentTheme() === 'dark';
  }

  logout() {
    this.authService.logout();
  }
}
