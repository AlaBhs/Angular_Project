import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-stage-table',
  templateUrl: './group-stage-table.component.html',
  styleUrls: ['./group-stage-table.component.css'],
  standalone: true,
  imports: [NgxSkeletonLoaderModule,CommonModule,], 
})
export class GroupStageTableComponent {
  @Input() groupStageRankings$!: Observable<any[]>; 
}
