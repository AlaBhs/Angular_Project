import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club } from '../dto/ucl-club-details.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-club-item',
  standalone: true,
  templateUrl: './club-item.component.html',
  styleUrls: ['./club-item.component.css'],
  imports:[RouterLink],
})
export class ClubItemComponent {
  @Input() club!: Club;
  @Input() isSelected: boolean = false;
  @Output() clubSelected = new EventEmitter<number>();
  isDefaultWallpaper:boolean = false ;

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/clubs-wallpapers/default-wallpaper.jpg'; 
    this.isDefaultWallpaper = true;
  }

  onClick(): void {
    this.clubSelected.emit(this.club.position);
  }
}
