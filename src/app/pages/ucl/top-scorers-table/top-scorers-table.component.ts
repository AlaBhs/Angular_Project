import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-scorers-table',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './top-scorers-table.component.html',
  styleUrl: './top-scorers-table.component.css',
})
export class TopScorersTableComponent {
  @Input() topScorers$!: Observable<any[]>;
}
