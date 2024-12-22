import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FootballDataService } from '../../services/football-data.service';

@Component({
  selector: 'app-ucl',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ucl.component.html',
  styleUrl: './ucl.component.css'
})
export class UclComponent implements OnInit {
  groupStageRankings: any[] = [];

  constructor(private footballDataService: FootballDataService) { }

  ngOnInit(): void {
    this.fetchGroupStageRankings();
  }

  fetchGroupStageRankings(): void {
    this.footballDataService.getUCLGroupStageRankings().subscribe({
      next: (data: any) => {
        this.groupStageRankings = data.standings || []; 
        console.log(this.groupStageRankings);
      },
      error: (error: any) => {
        console.error('Error fetching UCL rankings:', error);
      }
    });
  }
}
