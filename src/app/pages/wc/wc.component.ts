import { Component, OnInit, ViewEncapsulation, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WcListComponent } from './wc-list/wc-list.component';
import {WcService} from './wc.service';
import { WcStatComponent } from './wc-stat/wc-stat.component';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, Observable, of, startWith, debounceTime, combineLatest, BehaviorSubject } from 'rxjs';
import { CarouselComponent } from './carousel/carousel.component';
@Component({
  selector: 'app-wc',
  standalone: true,
  imports: [CommonModule, FormsModule, WcListComponent,WcStatComponent,ReactiveFormsModule,CarouselComponent],
  templateUrl: './wc.component.html',
  styleUrls: ['./wc.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WcComponent implements OnInit {
searchTerm: any;
formBuilder = inject(FormBuilder);


  
qs : string[] = ['x','y','z','w'];
  worldCups : any[]= [];
  
  filterControl = new FormControl('');
  sortControl = new FormControl('');
  filteredAndSortedWcs$: Observable<any[]> | undefined;
  
  constructor(@Inject(WcService) private worldCupService : WcService , private route : ActivatedRoute) { }
  ngOnInit(): void {
    
  
    // this.route.data.subscribe(data => {
    //   const table =data['questions'];
    //   console.log(table);
    //   for (let i = 0; i < table.length; i++) {
    //     this.qs.push(table[i].question);
    //   }
    //   console.log(this.qs)
    // })

    this.worldCupService.getWorldCups().subscribe(data => {
    this.worldCups = data;
    this.filteredAndSortedWcs$ = combineLatest([
      this.filterControl.valueChanges.pipe(startWith('')), // Start with empty string for initial value
      this.sortControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([filterValue, sortOption]) => {
        // Apply filtering
        let filteredArray = this.filterWorldCups(filterValue || '');

        // Apply sorting
        return this.sortWorldCups(filteredArray,sortOption || '');
      })
    );
})

    
  }
  generateStats()
  {
    this.worldCupService.generateQuestions().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.qs.push(data[i].question);
      }
      console.log(this.qs)
    })
  }

  sortWorldCups(worldCups: any[], sortOption: string): any[] {
    switch (sortOption) {
      case 'oldest':
        return worldCups.sort((a, b) => a.year - b.year);
      case 'newest':
        return worldCups.sort((a, b) => b.year - a.year);
      case 'mostGoals':
        return worldCups.sort((a, b) => b.goals_scored - a.goals_scored);
      case 'mostAttendance':
        return worldCups.sort((a, b) => b.attendance - a.attendance);
      default:
        return worldCups;
    }
  }
  
  filterWorldCups(searchTerm: string): any[] {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return this.worldCups.filter(
      (cup) =>
        cup.year.toString().includes(lowerCaseSearch) || // Filter by year
        (cup.winner && cup.winner.toLowerCase().includes(lowerCaseSearch)) // Filter by winner
    );
  }


}


