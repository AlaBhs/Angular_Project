import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wc-match-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './wc-match-item.component.html',
  styleUrl: './wc-match-item.component.css'
})
export class WcMatchItemComponent {

  @Input() match: any ;
  winner : string = '';

  resultDescription: string = '';

  ngOnInit(): void {
    this.parseScore(this.match.score);
  }

  parseScore(score: string): void {
    // Split score into regular time score and penalty score
    const regex = /\((\d+)\)\s(\d+)[–-](\d+)\s\((\d+)\)|(\d+)[–-](\d+)/; // matches the format (a) x-y (b)
    const match = score.match(regex);
    if (match) {
      if (match[1] && match[2] && match[3] && match[4]) {
        // Case: with penalties
        const homePenalties = Number(match[1]);
        const home = Number(match[2]);
        const away = Number(match[3]);
        const awayPenalties = Number(match[4]);
        if (homePenalties > awayPenalties) {
          this.winner = 'H';
        } else {
          this.winner = 'A';}
      } else if (match[5] && match[6]) {
        // Case: without penalties
        const home = Number(match[5]);
        const away = Number(match[6]);
        
        if (home > away) {
          this.winner = 'H';
        } else {
          this.winner = 'A';}
      }



      
        
      } 
    if (this.winner == 'H') {
      this.resultDescription = `${this.match.home_team} defeated ${this.match.away_team} ${score}`;
    }else if (this.winner == 'A') {
      this.resultDescription = `${this.match.away_team} defeated ${this.match.home_team} ${score}`;
  }
}
  flagImage(s: string): string
{
  if(s == 'H') s = this.match.home_team;
  else s = this.match.away_team;
  
  const countryMap: { [key: string]: string } = {
    "West Germany": "Germany",
    "United States": "united-states-of-america",
    "USA": "united-states-of-america",
    "Korea Republic": "south-korea"
  };
  
  s = countryMap[s] || s; // Map the country name if it exists in the map, otherwise keep the original
  
  return `https://cdn.countryflags.com/thumbs/${s.toLowerCase()}/flag-400.png`;
}
}
