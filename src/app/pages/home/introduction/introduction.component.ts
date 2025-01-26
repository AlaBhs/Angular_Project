import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {
  siteName: string = 'Football Hub'; // Replace with your site name
  uclImagePath: string = '../../../../assets/images/home_ucl.png'; // Path to UCL image
  wcImagePath: string = '../../../../assets/images/home_world_cup.jpg'; // Path to World Cup image
}