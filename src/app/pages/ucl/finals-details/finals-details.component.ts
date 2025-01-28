import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FinalsListComponent } from '../finals-list/finals-list.component';
import { CommonModule } from '@angular/common';
import { FinalsDetailsService } from './finals-details.service';
import { Final } from '../dto/finals-item.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finals-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, FinalsListComponent, CommonModule],
  templateUrl: './finals-details.component.html',
  styleUrls: ['./finals-details.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class FinalsDetailsComponent {
  searchTerm: string = '';
  sortTerm: string = '';
  finals: Final[] = [];

  filterControl = new FormControl('');
  sortControl = new FormControl('');
  filteredAndSortedFinals$: Observable<Final[]> | undefined;

  constructor(
    private finalsService: FinalsDetailsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filterControl.setValue(this.finalsService.getFilter());
    this.sortControl.setValue(this.finalsService.getSort());
    this.filteredAndSortedFinals$ = this.finalsService.getFilteredAndSortedFinals();
    combineLatest([
      this.filterControl.valueChanges.pipe(startWith('')),
      this.sortControl.valueChanges.pipe(startWith('')),
    ]).subscribe(([filter, sort]) => {
      this.finalsService.setFilter(filter || '');
      this.finalsService.setSort(sort || '');
      this.filteredAndSortedFinals$ = this.finalsService.getFilteredAndSortedFinals();
    });
  }
  goBack() {
    this.router.navigate(['/ucl']);
  }
}
