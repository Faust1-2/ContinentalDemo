import { User } from '@app/types/user.types';

export interface Event {
  id: string;
  name: string;
  type: 'service' | 'watch' | 'pod';
  startDate: string;
  endDate: string;
  image?: string;
  isAllDay?: boolean;
  recurrenceRule?: string;
  recurrenceException?: string;
  isReadonly?: boolean;
}

export type ContEvent = Event;
