import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Groq from 'groq-sdk';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class GroqService {
  private groq: any;

  constructor() {
    this.groq = new Groq({ apiKey: environment.groqApiKey , dangerouslyAllowBrowser: true}); // Initialize the SDK
  }

  getStat(question: string): Observable<string> {
    const request = this.groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `As a worldcup men football expert Provide the answer to the following question in the json format ( {X:X,Y:Y}) which could be 2 types 
          1: {"player_name" : "X" , "country_of_player" : "Y" , "number" : Z} 2: {"country" : "X" , "number" , Y}. IF TWO ANSWERS JUST GIVE ONE OF THEM Question: ${question}`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    // Convert the promise to an observable
    return from(request).pipe(
      map((response: any) => {
        const message = response.choices[0]?.message?.content?.trim() || '{}';
        console.log('Raw response message:', message); // Log the raw message

        // Ensure the content is a valid JSON string
        try {
          const parsedResponse = JSON.parse(message);
          return parsedResponse;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return { error: 'Invalid JSON response' }; // Return a default error response if parsing fails
        }
      }),
      catchError((error) => {
        console.error('Error fetching data from Groq API:', error);
        return throwError(() => new Error('Error fetching data from Groq API'));
      })
    );
  }


  generateQuestions(): Observable<string> {
    const request = this.groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Provide a list of notable Men's FIFA World Cup records in the format: ["phrase1", "phrase2", "phrase3", "phrase4"] 2 records are about players and 2 about countries , feel free to give any phrases but just provide the table of length 4 don't give anything extra and let each phrase be very court but have meaning and start with "player/country with the " `,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    // Convert the promise to an observable
    return from(request).pipe(
      map((response: any) => {
        const message = response.choices[0]?.message?.content?.trim() || '{}';
        const questions = JSON.parse(message); // Assuming it's a valid JSON string
        // Convert the array of questions into a table format (array of objects)
        const tableData = questions.map((question: any, index: number) => {
          return { id: index + 1, question: question };
        });
        console.log(tableData)
        return tableData; // Return the formatted table data
      }),
      catchError((error) => {
        console.error('Error fetching data from Groq API:', error);
        return throwError(() => new Error('Error fetching data from Groq API'));
      })
    );
  }
}
