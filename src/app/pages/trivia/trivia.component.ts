import { Component } from '@angular/core';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent {
  startQuiz(category: string): void {
    alert(`Starting quiz: ${category}`);
    // You can add navigation or quiz-loading logic here.
  }
}
