import { Component, inject, OnInit } from '@angular/core';
import { Club } from '../dto/ucl-club-details.dto';
import { ClubItemComponent } from '../club-item/club-item.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClubService } from './team-performances.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-performances',
  standalone: true,
  imports: [ClubItemComponent, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './team-performances.component.html',
  styleUrls: ['./team-performances.component.css'],
})
export class TeamPerformancesComponent implements OnInit{
  selectedClub: number | null = null;
  selectedCountry: string = '';
  searchByName: string = '';
  private clubService = inject(ClubService);

  clubData: Observable<Club[]> | null = null ;
  filteredClubs: Observable<Club[]> | null = null ;

  ngOnInit(): void {
    this.clubData = this.clubService.getClubs();
    this.filteredClubs = this.clubData;
  }
  selectClub(club: number): void {
    this.selectedClub = club;
  }

  onSearchChange(): void {
    this.filteredClubs = this.clubService.onSearchAndFilter(this.searchByName, this.selectedCountry);
  }

  filterClubs(): void {
    if (this.selectedCountry || this.searchByName) {
      this.filteredClubs = this.clubService.onSearchAndFilter(this.searchByName, this.selectedCountry);
    } else {
      this.filteredClubs = this.clubData;
    }
  }
}
