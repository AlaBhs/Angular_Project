import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FinalsListComponent } from "../finals-list/finals-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finals-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, FinalsListComponent,CommonModule,],
  templateUrl: './finals-details.component.html',
  styleUrl: './finals-details.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FinalsDetailsComponent {
  searchTerm: any;
  formBuilder = inject(FormBuilder);
  selectedYear$: Observable<number | null> | undefined;
  finals: any[] = [
    {
      year: 1955,
      host: 'Spain',
      winner: 'Real Madrid',
      score: '4–3',
      opponent: 'Reims',
      opponentCountry: 'France',
      stadium: 'Parc des Princes',
      city: 'Paris',
      country: 'France',
      attendance: 38239,
    },
    {
      year: 1956,
      host: 'Spain',
      winner: 'Real Madrid',
      score: '2–0',
      opponent: 'Fiorentina',
      opponentCountry: 'Italy',
      stadium: 'Santiago Bernabéu',
      city: 'Madrid',
      country: 'Spain',
      attendance: 124000,
    },
    {
      year: 1957,
      host: 'Spain',
      winner: 'Real Madrid',
      score: '3–2',
      opponent: 'Milan',
      opponentCountry: 'Italy',
      stadium: 'Heysel Stadium',
      city: 'Brussels',
      country: 'Belgium',
      attendance: 67000,
    },
  ];

  filterControl = new FormControl('');
  sortControl = new FormControl('');
  filteredAndSortedWcs$: Observable<any[]> | undefined;

  constructor(private route: ActivatedRoute) {
    // this.selectedYear$ = this.finalservice.selectedYear$;
  }
  ngOnInit(): void {
    // this.selectedYear$?.subscribe((year) => {
    //   if(year !== null)
    //   this.finalservice.store(this.filterControl.value as string, this.sortControl.value as string);
    // });
    // this.finalservice.getfinals().subscribe(data => {
    // this.finals = data;
    // this.filteredAndSortedWcs$ = combineLatest([
    //   this.filterControl.valueChanges.pipe(startWith(this.filterControl.value)), // Start with empty string for initial value
    //   this.sortControl.valueChanges.pipe(startWith(this.sortControl.value))
    // ]).pipe(
    //   map(([filterValue, sortOption]) => {
    //      if((filterValue == '')&&(sortOption == ''))
    //      {filterValue = this.finalservice.filter ;
    //       sortOption = this.finalservice.sort;
    //      }
    //     let filteredArray = this.filterfinals(filterValue || '');
    //     // Apply sorting
    //     return this.sortfinals(filteredArray,sortOption || '');
    //   })
    // );
    // })
  }

  sortfinals(finals: any[], sortOption: string): any[] {
    switch (sortOption) {
      case 'oldest':
        return finals.sort((a, b) => a.year - b.year);
      case 'newest':
        return finals.sort((a, b) => b.year - a.year);
      case 'mostGoals':
        return finals.sort((a, b) => b.goals_scored - a.goals_scored);
      case 'mostAttendance':
        return finals.sort((a, b) => b.attendance - a.attendance);
      default:
        return finals;
    }
  }

  filterfinals(searchTerm: string): any[] {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return this.finals.filter(
      (cup) =>
        cup.year.toString().includes(lowerCaseSearch) || // Filter by year
        (cup.winner && cup.winner.toLowerCase().includes(lowerCaseSearch)) // Filter by winner
    );
  }
}
