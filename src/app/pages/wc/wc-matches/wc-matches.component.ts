import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WcMatchItemComponent } from '../wc-match-item/wc-match-item.component';


interface Match {
  match_time: string;
  venue: string;
  home_team: string;
  away_team: string;
  attendance: number;
  referee: string;
  score: string;
  home_team_flag: string;
  away_team_flag: string;
  stage: string; // Add the 'stage' property
}

interface Stage {
  name: string;
  matches: Match[];
}

@Component({
  selector: 'app-wc-matches',
  standalone: true,
  imports: [NgFor,WcMatchItemComponent],
  templateUrl: './wc-matches.component.html',
  styleUrl: './wc-matches.component.css'
})
export class WcMatchesComponent {
  stages: Stage[] = []; // Stores the filtered and ordered stages
  selectedYear: number = 2022; // Default to 2022
  allMatches: Match[] = []; // Holds all the fetched matches

  constructor() {}

  ngOnInit(): void {
    this.fetchMatches();
  }

  fetchMatches(): void {
    // Fetch matches using the service
    // this.matchService.getMatchesByYear(this.selectedYear).subscribe((matches: Match[]) => {
    //   this.allMatches = matches;
    //   this.filterAndOrderStages();
    // });
  }

  filterAndOrderStages(): void {
    const knockoutStagesOrder = [
      'Final',
      'Place for 3rd', // Third-place match
      'Semi-Finals',
      'Quarter-Finals',
      'Round of 16',
    ];

    // Filter out group stages (assuming they have different names like "Group A", "Preliminary round", etc.)
    const filteredMatches = this.allMatches.filter(match =>
      knockoutStagesOrder.includes(match.stage)
    );

    // Group matches by stage and order them as per `knockoutStagesOrder`
    this.stages = knockoutStagesOrder
      .map(stageName => {
        const matchesInStage = filteredMatches.filter(match => match.stage === stageName);
        return {
          name: stageName,
          matches: matchesInStage,
        };
      })
      .filter(stage => stage.matches.length > 0); // Remove empty stages
  }

}





