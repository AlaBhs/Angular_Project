import { Component, Input } from '@angular/core';
import { FinalsItemComponent } from "../finals-item/finals-item.component";

import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-finals-list',
  standalone: true,
  imports: [FinalsItemComponent,CommonModule,NgxSkeletonLoaderModule],
  templateUrl: './finals-list.component.html',
  styleUrl: './finals-list.component.css'
})
export class FinalsListComponent {
  @Input() finals: any[] = [];
}
