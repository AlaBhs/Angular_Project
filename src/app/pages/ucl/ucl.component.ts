import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FootballDataService } from '../../services/football-data.service';
import { Observable, of } from 'rxjs';
import { UclTeam } from './dto/ucl-team.dto';
import { CommonModule } from '@angular/common';
import { GroupStageTableComponent } from "./group-stage-table/group-stage-table.component";
import { TopScorersTableComponent } from "./top-scorers-table/top-scorers-table.component";

@Component({
  selector: 'app-ucl',
  standalone: true,
  imports: [RouterLink, CommonModule, GroupStageTableComponent, TopScorersTableComponent],
  templateUrl: './ucl.component.html',
  styleUrl: './ucl.component.css',
})
export class UclComponent implements OnInit {
  expanded = signal(false);
  expandedScorers = signal(false);
  groupStageRankings$: Observable<UclTeam[]> = of([]);
  topScorers$: Observable<any> = of([]);

  constructor(private footballDataService: FootballDataService) {}

  ngOnInit() {
    this.groupStageRankings$ = this.footballDataService.getGroupStageRankings();
    this.topScorers$ = this.footballDataService.getTopScorers();

    this.groupStageRankings$.subscribe({
      next: (data) => console.log('Data emitted from the service:', data),
      error: (error) =>
        console.error('Error fetching groupStageRankings:', error),
      complete: () => console.log('Observable completed'),
    });

    this.topScorers$.subscribe({
      next: (data) => console.log('Data emitted from the service:', data),
      error: (error) => console.error('Error fetching topScorers:', error),
      complete: () => console.log('Observable completed'),
    });
  }
  toggleView() {
    this.expanded.set(!this.expanded());
  }
  toggleViewScorers() {
    this.expandedScorers.set(!this.expandedScorers()); 
  }
}
