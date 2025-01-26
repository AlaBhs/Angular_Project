import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { QuizService } from './quiz.service';
import { AuthService } from '../../../components/auth/auth.service';
import { RouterLink } from '@angular/router';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { QuizQuestion } from '../classes/quizquestion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class DailyQuizComponent implements OnInit {
  questions: QuizQuestion[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: string | null = null;
  isAnswered: boolean = false;
  isCorrect: boolean | null = null;
  score: number = 0;
  quizEnded: boolean = false;
  hasPlayedToday: boolean = false;
  quizStarted: boolean = false;
  startQuizDate: string | null = null;
  dayChangedError: boolean = false;

  constructor(
    private quizService: QuizService,
    public authService: AuthService,
    private leaderboardService: LeaderboardService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkIfUserHasPlayedToday();
  }

  checkIfUserHasPlayedToday() {
    const username = this.authService.getCurrentUser()?.username;
    if (username) {
      this.hasPlayedToday = this.quizService.hasUserPlayedToday(username);
      if (!this.hasPlayedToday) {
        this.loadQuestions();
      }
    }
  }

  loadQuestions() {
    this.quizService.getDailyQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  startQuiz() {
    this.quizStarted = true;
    this.startQuizDate = this.quizService.getCurrentDate();
  }

  selectAnswer(answer: string) {
    if (this.isAnswered || this.hasPlayedToday) return;

    this.selectedAnswer = answer;
    this.isAnswered = true;

    const isCorrect = this.quizService.checkAnswer(
      this.currentQuestion,
      answer
    );
    this.isCorrect = isCorrect;

    if (isCorrect) {
      this.score++;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        setTimeout(() => {
          this.nextQuestion();
        }, 1000);
      } else {
        this.endQuiz();
      }
    } else {
      setTimeout(() => {
        this.endQuiz();
      }, 2000);
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.resetQuestionState();
  }

  resetQuestionState() {
    this.selectedAnswer = null;
    this.isAnswered = false;
    this.isCorrect = null;
  }

  endQuiz() {
    const currentDate = this.quizService.getCurrentDate();
    if (this.startQuizDate !== currentDate) {
      this.dayChangedError = true; // Show error if the day has changed
      console.log(this.dayChangedError);
    }
    else{
      this.quizEnded = true;

      const username = this.authService.getCurrentUser()?.username;
      if (username) {
        this.quizService.saveUserScore(username, this.score);
      }

      this.leaderboardService.refreshLeaderboard();
    }
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }
}