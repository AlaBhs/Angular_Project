import { Component, Input } from '@angular/core';
import { FinalsItemComponent } from "../finals-item/finals-item.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finals-list',
  standalone: true,
  imports: [FinalsItemComponent,CommonModule],
  templateUrl: './finals-list.component.html',
  styleUrl: './finals-list.component.css'
})
export class FinalsListComponent {
  @Input() finals: any[] = [];
}
