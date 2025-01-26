import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballFact } from '../classes/football-fact';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-football-fact',
  standalone: true,
  imports: [], // Add necessary modules here
  templateUrl: './football-fact.component.html',
  styleUrls: ['./football-fact.component.css'],
})
export class FootballFactComponent implements OnInit {
  fact: FootballFact | null = null;
  safeVideoUrl: SafeResourceUrl | undefined;
  safeThumbnailUrl: SafeUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Get the resolved data from the route
    this.fact = this.route.snapshot.data['fact'];
    if (this.fact) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fact.videoUrl);
      this.safeThumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(this.getVideoThumbnail(this.fact.videoUrl));
    }
  }

  // Helper method to get YouTube thumbnail URL
  getVideoThumbnail(videoUrl: string): string {
    const videoId = this.extractVideoId(videoUrl);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/0.jpg`; // Default thumbnail
    }
    return ''; // Fallback if no video ID is found
  }

  // Helper method to extract video ID from YouTube URL
  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
}