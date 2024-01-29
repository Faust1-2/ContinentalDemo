import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContEvent } from '@app/types/event.types';
import { EventMapper, SchedulerEvent } from '@app/utils/event.mapper';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  constructor(private httpClient: HttpClient, private eventMapper: EventMapper) {
  }

  public getEvents(upToDate = false) {
    return this.httpClient.get<ContEvent[]>('events', {
      withCredentials: true,
      params: {
        upToDate: upToDate.toString(),
      },
    });
  }

  public getEvent(eventId: string) {
    return this.httpClient.get<ContEvent>('events' + eventId, {
      withCredentials: true,
    });
  }

  public addEvent(event: SchedulerEvent) {
    console.log(event);
    return this.httpClient.post<ContEvent>('events', this.eventMapper.mapToEvent(event), {
      withCredentials: true,
    });
  }

  public updateEvent(event: SchedulerEvent) {
    return this.httpClient.patch<ContEvent>('events' + event.Id, this.eventMapper.mapToEvent(event), {
      withCredentials: true,
    });
  }

  public deleteEvent(event: SchedulerEvent) {
    return this.httpClient.delete<ContEvent>('events' + event.Id, {
      withCredentials: true,
    });
  }

  public subscribeToEvent(eventId: string) {
    return this.httpClient.post<ContEvent>('events/' + eventId + '/subscribe', {}, {
      withCredentials: true,
    });
  }

  public unsubscribeFromEvent(eventId: string) {
    return this.httpClient.delete<ContEvent>('events/' + eventId + '/subscribe', {
      withCredentials: true,
    });
  }

  public isSubscribedToEvent(eventId: string) {
    return this.httpClient.get<boolean>('events/' + eventId + '/subscribe', {
      withCredentials: true,
    });
  }

  public getSubscribedEvents() {
    return this.httpClient.get<ContEvent[]>('users/subscriptions', {
      withCredentials: true,
    });
  }
}
