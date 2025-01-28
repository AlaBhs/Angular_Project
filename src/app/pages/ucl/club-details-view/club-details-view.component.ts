import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../dto/ucl-club-details.dto';
import { ClubService } from '../team-performances/team-performances.service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-club-details-view',
  standalone: true,
  templateUrl: './club-details-view.component.html',
  styleUrls: ['./club-details-view.component.css'],
  imports:[CommonModule],
})
export class ClubDetailsViewComponent {
  club$: Observable<Club | undefined> | null = null;
  private clubService = inject(ClubService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.club$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const id = params['id'];
        return this.clubService.getClubById(id);
      }),
      catchError((error) => {
        console.error('Error fetching club:', error);
        return of(undefined); 
      })
    );
  }

  getCountryFlag(countryCode: string): string {
    const countryMap: { [key: string]: string } = {
      GER: 'germany', // Germany
      ITA: 'italy', // Italy
      ENG: 'england', // England
      ESP: 'spain', // Spain
      FRA: 'france', // France
      POR: 'portugal', // Portugal
      NED: 'netherlands', // Netherlands
      BEL: 'belgium', // Belgium
      RUS: 'russia', // Russia
      TUR: 'turkey', // Turkey
      UKR: 'ukraine', // Ukraine
      SWE: 'sweden', // Sweden
      CRO: 'croatia', // Croatia
      POL: 'poland', // Poland
      GRE: 'greece', // Greece
      DEN: 'denmark', // Denmark
      SUI: 'switzerland', // Switzerland
      AUT: 'austria', // Austria
      NOR: 'norway', // Norway
      HUN: 'hungary', // Hungary
      ROM: 'romania', // Romania
      BUL: 'bulgaria', // Bulgaria
      SRB: 'serbia', // Serbia
      CZE: 'czech-republic', // Czech Republic
    };
    
    return countryMap[countryCode] || countryCode;
  }
  
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/clubs-wallpapers/default-wallpaper.jpg'; 
  }
  flagImage(s: string) {
    return (
      'https://cdn.countryflags.com/thumbs/' + s.toLowerCase() + '/flag-400.png'
    );
  }
}
