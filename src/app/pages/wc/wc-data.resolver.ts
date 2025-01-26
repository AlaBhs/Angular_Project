import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WcService } from './wc.service';  // Import your service

@Injectable({
  providedIn: 'root',
})
export class WcDataResolver implements Resolve<any> {
  constructor(private worldCupService: WcService) {}

  resolve(): Observable<any> {
    //return this.worldCupService.generateQuestions();  // Fetch the questions here
    return(of(null));
  }
}
