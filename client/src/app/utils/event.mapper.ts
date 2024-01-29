import { ContEvent, Event } from '@app/types/event.types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventMapper {

  mapToEvent(event: SchedulerEvent): Event {
    return {
      id: event.Id as string,
      name: event.Subject as string,
      startDate: event.StartTime as string,
      endDate: event.EndTime as string,
      organizer: 'organizer',
      bartenders: [],
      isReadonly: Boolean(event.IsReadonly),
      image: undefined,
      isAllDay: event.IsAllDay,
      recurrenceException: event.RecurrenceException,
      recurrenceRule: event.RecurrenceRule,
      type: 'pod',
    };
  }

  mapToScheduler(event: ContEvent): SchedulerEvent {
    return {
      Id: event.id,
      Subject: event.name,
      StartTime: event.startDate,
      EndTime: event.endDate,
      IsReadonly: event.isReadonly,
      RecurrenceException: event.recurrenceException,
      RecurrenceRule: event.recurrenceRule,
    };
  }
}

export type SchedulerEvent = {
  Id: string;
  Subject: string;
  StartTime: string;
  EndTime: string;
  IsReadonly?: boolean;
  RecurrenceException?: string;
  RecurrenceRule?: string;
  IsAllDay?: boolean;
}
