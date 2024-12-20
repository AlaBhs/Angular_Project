import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-this-day',
  templateUrl: './on-this-day.component.html',
  styleUrls: ['./on-this-day.component.css']
})
export class OnThisDayComponent implements OnInit {
  events: {id:number, year: number; description: string }[] = [];

  ngOnInit(): void {
    console.log(this.events);
    this.loadEvents();
    console.log(this.events);
  }

  loadEvents(): void {
    // Simulated data for "On This Day" events
    const allEvents = [
      {id:1, date: '12-20', year: 1990, description: 'First FIFA World Player of the Year awarded to Lothar Matthäus.' },
      {id:2, date: '12-20', year: 2009, description: 'Barcelona won the FIFA Club World Cup for the first time.' },
      {id:3, date: '12-20', year: 1983, description: 'Diego Maradona scored a hat-trick in a historic match.' },
      {id:4, date: '12-19', year: 1971, description: 'Ajax secured their first Intercontinental Cup title.' },
    ];

    // Get today's date in MM-DD format
    const today = new Date().toISOString().slice(5, 10);

    // Filter events for today's date
    this.events = allEvents.filter((event) => event.date === today);
  }
}
