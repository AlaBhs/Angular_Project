import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finals-item',
  standalone: true,
  imports: [],
  templateUrl: './finals-item.component.html',
  styleUrl: './finals-item.component.css'
})
export class FinalsItemComponent implements OnInit {
 @Input() final : any;
  imagesrc: string="";
  constructor() { }
  ngOnInit() {
    this.imagesrc = this.flagImage(this.final.winner);
} 
flagImage(s : string )
{
  return "https://cdn.countryflags.com/thumbs/" + s.toLowerCase() + "/flag-400.png";
}
selectYear(year: number) {
  console.log(year);
}
}
