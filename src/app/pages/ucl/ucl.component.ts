import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FootballDataService } from '../../services/football-data.service';
import { Observable, of } from 'rxjs';
import { UclTeam } from './dto/ucl-team.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ucl',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './ucl.component.html',
  styleUrl: './ucl.component.css'
})
export class UclComponent implements OnInit {
  viewMore:boolean = false;
  groupStageRankings$: Observable<UclTeam[]> = of([]);


  constructor(private footballDataService: FootballDataService) {}

  ngOnInit() {
    this.groupStageRankings$ = this.footballDataService.getGroupStageRankings();
    this.groupStageRankings$.subscribe({
      next: (data) => console.log('Data emitted from the service:', data),
      error: (error) => console.error('Error fetching groupStageRankings:', error),
      complete: () => console.log('Observable completed'),
    });
  }
}
