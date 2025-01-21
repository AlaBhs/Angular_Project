
import { Component, Input, OnInit } from '@angular/core';
import { getRandomValues } from 'crypto';

@Component({
  selector: 'app-wc-item',
  standalone: true,
  templateUrl: './wc-item.component.html',
  styleUrls: ['./wc-item.component.css','../wc.component.css']
})
export class WcItemComponent implements OnInit {
  @Input() wc : any;
  imagesrc: string="";

  ngOnInit() {
    this.imagesrc = this.flagImage(this.wc.winner);
} 
flagImage(s : string )
{
  if (s == "West Germany") s = "Germany"; 
  return "https://cdn.countryflags.com/thumbs/" + s.toLowerCase() + "/flag-400.png";
}
  
}
