
import { Component, Input, OnInit } from '@angular/core';
import { getRandomValues } from 'crypto';
import { WcService } from '../wc.service';

@Component({
  selector: 'app-wc-item',
  standalone: true,
  templateUrl: './wc-item.component.html',
  styleUrls: ['./wc-item.component.css','../wc.component.css']
})
export class WcItemComponent implements OnInit {
  @Input() wc : any;
  imagesrc: string="";
  constructor(private wcService : WcService) { }
  ngOnInit() {
    this.imagesrc = this.flagImage(this.wc.winner);
} 
flagImage(s : string )
{
  if (s == "West Germany") s = "Germany"; 
  return "https://cdn.countryflags.com/thumbs/" + s.toLowerCase() + "/flag-400.png";
}
selectYear(year: number) {
  console.log(year);
  this.wcService.selectYear(year);  // Emit the selected year through the service
}
}
