import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Quote } from '../../../pages/home/classes/quote'; // Import the Quote class
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule], // Add FormsModule here
  standalone: true,
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  randomQuote: Quote | null = null; // Variable to store the random quote

  constructor(
    private authService: AuthService, // Inject AuthService
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the preloaded quote from the resolver
    this.randomQuote = this.route.snapshot.data['quote'];
  }

  onSubmit() {
    this.authService.login(this.username, this.password);
  }
}