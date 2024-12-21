import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemesService } from '../../services/themes.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isDarkMode: boolean = false;
  constructor(private themesService: ThemesService) {}

  ngOnInit() {
    const currentTheme = this.themesService.getCurrentTheme();
    this.isDarkMode = currentTheme === 'dark';
  }
  toggleTheme() {
    this.themesService.toggleTheme();
    this.isDarkMode = this.themesService.getCurrentTheme() === 'dark';
  }
}
