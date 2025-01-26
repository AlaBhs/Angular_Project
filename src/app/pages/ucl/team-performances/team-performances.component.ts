import { Component, ViewChild } from '@angular/core';
import { Club } from '../dto/ucl-club-details.dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-performances',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    BrowserAnimationsModule,CommonModule,
  ],
  templateUrl: './team-performances.component.html',
  styleUrl: './team-performances.component.css',
})
export class TeamPerformancesComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'country',
    'participated',
    'titles',
    'played',
    'win',
    'draw',
    'loss',
    'goalsFor',
  ];

  dataSource = new MatTableDataSource<Club>([
    {
      position: 1,
      name: 'Real Madrid CF',
      country: 'ESP',
      participated: 53,
      titles: 14,
      played: 476,
      win: 285,
      draw: 81,
      loss: 110,
      goalsFor: 1047,
    },
    {
      position: 2,
      name: 'FC Bayern München',
      country: 'GER',
      participated: 39,
      titles: 6,
      played: 382,
      win: 229,
      draw: 76,
      loss: 77,
      goalsFor: 804,
    },
    {
      position: 3,
      name: 'FC Barcelona',
      country: 'ESP',
      participated: 33,
      titles: 5,
      played: 339,
      win: 197,
      draw: 76,
      loss: 66,
      goalsFor: 667,
    },
    {
      position: 4,
      name: 'Manchester United',
      country: 'ENG',
      participated: 30,
      titles: 3,
      played: 293,
      win: 160,
      draw: 69,
      loss: 64,
      goalsFor: 533,
    },
    {
      position: 5,
      name: 'Juventus',
      country: 'ITA',
      participated: 37,
      titles: 2,
      played: 301,
      win: 153,
      draw: 70,
      loss: 78,
      goalsFor: 479,
    },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
