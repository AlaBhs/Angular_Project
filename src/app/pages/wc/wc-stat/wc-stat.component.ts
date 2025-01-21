import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { WcService } from '../wc.service';
import { NgIf } from '@angular/common';
import { parse } from 'path';

@Component({
  selector: 'app-wc-stat',
  standalone: true,
  imports: [NgIf],
  templateUrl: './wc-stat.component.html',
  styleUrl: './wc-stat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WcStatComponent implements OnInit {
  @Input() question!: string;

  // Define signals for stat and imagesrc
  stat = signal<string | null>(null);
  imagesrc = signal<string>('');

  constructor(private wcService: WcService) {}

  ngOnInit(): void {
    if (this.question) {
      // this.wcService.getStat(this.question).subscribe(
      //   data => {
      //     // Check if the data is valid and contains expected properties
      //     if (data) {
      //       console.log('API Response:', data);
            
      //       if (data.country_of_player) {
      //         // Update the signals
      //         this.imagesrc.set(`https://cdn.countryflags.com/thumbs/${data.country_of_player.toLowerCase()}/flag-400.png`);
      //         this.stat.set(`${data.player_name} ( ${data.number} )`);
      //         console.log(this.stat());
      //       } else if (data.country) {
      //         this.imagesrc.set(`https://cdn.countryflags.com/thumbs/${data.country.toLowerCase()}/flag-400.png`);
      //         this.stat.set(`${data.country} ( ${data.number} )`);
      //       }
      //     }
      //   },
      //   error => {
      //     console.error('Error fetching data from service:', error);
      //   }
      // );
    }
  }
}
