import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wc-match-item',
  standalone: true,
  imports: [],
  templateUrl: './wc-match-item.component.html',
  styleUrl: './wc-match-item.component.css'
})
export class WcMatchItemComponent {
  @Input() homeTeamFlag: string = ''; 
  @Input() awayTeamFlag: string = '';
  @Input() homeTeam: string =   '';
  @Input() awayTeam: string =   '';
  @Input() score: string = '' // Format: "(a) x-y (b)" (penalties)
  @Input() venue: string =  '';
  @Input() attendance: any ;
  @Input() referee: string=''
  @Input() matchDate: string=''


  resultDescription: string = '';

  ngOnInit(): void {
    this.parseScore(this.score);
  }

  parseScore(score: string): void {
    // Split score into regular time score and penalty score
    const regex = /\((\d+)\)\s(\d+)-(\d+)\s\((\d+)\)/; // matches the format (a) x-y (b)
    const match = score.match(regex);

    if (match) {
      // Extract the values from the regex match
      const homePenalties = Number(match[1]);
      const home = Number(match[2]);
      const away = Number(match[3]);
      const awayPenalties = Number(match[4]);



      // Determine the winner and result description
      if (homePenalties !== awayPenalties) {
        // If penalties are different, determine winner based on penalties
        if (homePenalties > awayPenalties) {
          this.resultDescription = `${this.homeTeam} won by penalties ${homePenalties}-${awayPenalties}`;
        } else {
          this.resultDescription = `${this.awayTeam} won by penalties ${awayPenalties}-${homePenalties}`;
        }
      } else {
        // If penalties are the same, the regular score determines the winner
        if (home > away) {
          this.resultDescription = `${this.homeTeam} won ${home}-${away}`;
        } else if (away > home) {
          this.resultDescription = `${this.awayTeam} won ${away}-${home}`;
        } 
      }
    } else {
      this.resultDescription = 'Score format is invalid';
    }
  }
}
