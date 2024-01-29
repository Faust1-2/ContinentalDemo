import { Component, OnInit } from '@angular/core';
import { Event } from '@app/types/event.types';
import { EventsService } from '@app/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {

  public events: Event[] = [];
  public currentEventIndex = 0;
  protected readonly moment = moment;

  constructor(private eventService: EventsService) {

  }

  ngOnInit() {
    this.eventService.getEvents(true).subscribe((events) => {
      this.events = events;
    });
  }

  formatDate() {
    const event = this.events[this.currentEventIndex];
    const startDate = moment(event.startDate);
    const endDate = moment(event.endDate);

    const dateDiff = endDate.diff(moment(), 'days');

    if (dateDiff === 0) {
      return 'Aujourd\'hui de ' + startDate.format('h:mm (a)') + ' à ' + endDate.format('h:mm (a)');
    } else if (dateDiff === 1) {
      return 'Demain de ' + startDate.format('h:mm (a)') + ' à ' + endDate.format('h:mm (a)');
    } else {
      return startDate.format('dddd, MMMM D YYYY');
    }
  }

  nextPage() {
    if (this.currentEventIndex < this.events.length - 1) {
      this.currentEventIndex++;
    } else {
      this.currentEventIndex = 0;
    }
  }

  previousPage() {
    if (this.currentEventIndex > 0) {
      this.currentEventIndex--;
    } else {
      this.currentEventIndex = this.events.length - 1;
    }
  }
}
