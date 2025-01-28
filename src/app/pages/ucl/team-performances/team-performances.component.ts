import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Club } from '../dto/ucl-club-details.dto';
import { ClubItemComponent } from '../club-item/club-item.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClubService } from './team-performances.service';
import { Observable, of } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-team-performances',
  templateUrl: './team-performances.component.html',
  styleUrls: ['./team-performances.component.css'],
  standalone: true,
  imports: [
    ClubItemComponent,
    CommonModule,
    RouterOutlet,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
})
export class TeamPerformancesComponent implements OnInit {
  @ViewChild('masterView') masterViewElement!: ElementRef;
  selectedClub: number | null = null;
  selectedCountry: string = '';
  searchByName: string = '';
  clubData$: Observable<Club[]> | null = null;
  filteredClubs$: Observable<Club[]> | null = null;

  private isLoading = false; // To avoid multiple simultaneous loads

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.clubData$ = this.clubService.clubs$; // Bind the observable to the component
    this.filteredClubs$ = this.clubData$;
    this.clubService.loadMoreClubs().subscribe((clubs) => {
      console.log('Clubs Loaded in Component:', clubs); // Log the fetched data
    });
  }

  selectClub(club: number): void {
    this.selectedClub = club;
  }

  applyFilters(): void {
    const searchTerm = this.searchByName; 
    const country = this.selectedCountry; 
  
    this.clubService
      .onSearchAndFilter(searchTerm, country)
      .subscribe((filteredClubs) => {
        console.log('Filtered Clubs:', filteredClubs);
        this.filteredClubs$ = of(filteredClubs); // Update the observable
      });
  }
  goBack() {
    this.router.navigate(['/ucl']);
  }

  onScroll(event: Event): void {
    if (this.isLoading) return; // Avoid triggering multiple requests

    const element = this.masterViewElement.nativeElement;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;

    if (scrollPosition >= scrollHeight) {
      this.loadMoreClubs();
    }
  }

  loadMoreClubs(): void {
    this.isLoading = true;
    this.clubService.loadMoreClubs().subscribe(() => {
      this.isLoading = false;
    });
  }
}
