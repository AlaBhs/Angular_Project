import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WcMatchItemComponent } from '../wc-match-item/wc-match-item.component';
import { WcService } from '../wc.service';
import { Observable } from 'rxjs';


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
  stage: string; // This represents the stage name, which we will dynamically get from the matches
}

interface Stage {
  name: string;
  matches: Match[];
  matchCount: number; // This will store the number of matches in the stage
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
  allMatches: Match[] = []; // Holds all the fetched matches
  year : any;
  constructor(private wcService : WcService) {
  }

  ngOnInit(): void {
    this.fetchMatches();
  }

  
  fetchMatches(): void {
    // Fetch matches using the service (matches are already filtered to knockout stages)
    this.wcService.selectedYear$.subscribe((year) => {
      if (year !== null) {
        this.wcService.fetchKnockOutMatchesByYear(year).subscribe((matches: Match[]) => {
          this.organizeMatchesByStage(matches);
          this.year=year;
        });
      }
    });
  }

  organizeMatchesByStage(matches: Match[]): void {
    // Group matches by their stage
    const groupedStages: { [key: string]: Match[] } = {};

    matches.forEach((match) => {
      if (!groupedStages[match.stage]) {
        groupedStages[match.stage] = [];
      }
      groupedStages[match.stage].push(match);
    });

    // Convert the grouped object into an array of stages with match counts
    const stagesWithMatchCount: Stage[] = Object.keys(groupedStages)
      .map((stageName) => {
        const stageMatches = groupedStages[stageName];
        return {
          name: stageName,
          matches: stageMatches,
          matchCount: stageMatches.length,
        };
      })
      .filter((stage) => stage.matches.length > 0); // Remove any empty stages

    // Now we need to sort the stages dynamically
    this.stages = stagesWithMatchCount.sort((a, b) => {
      // Final and Place for 3rd are special, we can sort them first by match count
      if (a.name === "Final" && b.matchCount === 1) return -1; // Move Final and Place for 3rd to the top

      // Sort the remaining stages by the number of matches (ascending)
      return a.matchCount - b.matchCount;
    });
  }
  goBackToList() {
    this.wcService.resetSelectedYear();
    }
}







