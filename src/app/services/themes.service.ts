import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private currentTheme: string = 'light'; 
  constructor(@Inject(DOCUMENT) private document: Document) {}
  
  loadTheme(themeName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const themeSrc = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;

    if (themeSrc) {
      themeSrc.href = `${themeName}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${themeName}.css`;
      head.appendChild(style);
    }
    this.currentTheme = themeName;
  }
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.loadTheme(newTheme);
  }
  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
