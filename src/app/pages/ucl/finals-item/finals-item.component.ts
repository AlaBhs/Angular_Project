import { Component, Input, OnInit } from '@angular/core';
import { Final } from '../dto/finals-item.dto';

@Component({
  selector: 'app-finals-item',
  standalone: true,
  imports: [],
  templateUrl: './finals-item.component.html',
  styleUrl: './finals-item.component.css'
})
export class FinalsItemComponent implements OnInit {
 @Input() final! : Final;
  imagesrc: string="";
  constructor() { }
  ngOnInit() {
    this.imagesrc = this.flagImage(this.final.winner);
} 
flagImage(s : string )
{
  return "https://cdn.countryflags.com/thumbs/" + s.toLowerCase() + "/flag-400.png";
}
onImageError(event: Event): void {
  const target = event.target as HTMLImageElement;
  target.src = 'assets/clubs-wallpapers/default-wallpaper.jpg'; 
}
selectYear(year: number) {
  console.log(year);
}
}
