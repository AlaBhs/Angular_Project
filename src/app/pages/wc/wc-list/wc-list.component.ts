import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WcItemComponent } from '../wc-item/wc-item.component';
import { WcComponent } from '../wc.component';

@Component({
  selector: 'app-wc-list',
  standalone: true,
  imports: [CommonModule, WcItemComponent],
  templateUrl: './wc-list.component.html',
  styleUrls: ['./wc-list.component.css']
})
export class WcListComponent {
  @Input() worldCups: any[] = [];
}

