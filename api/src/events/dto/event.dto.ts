import { ApiProperty } from '@nestjs/swagger';
import { UserContinental } from '../../users/entities/user.entity';
import { EventType } from '../entities/event.entity';

export class EventCreateDto {
  @ApiProperty({
    description: 'The name of the event',
    type: String,
    example: 'Service Continental',
  })
  name: string;

  @ApiProperty({
    description: 'The type of the event',
    type: String,
    example: 'service',
  })
  type: EventType;

  @ApiProperty({
    description: 'The start date of the event',
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the event',
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'The id of the organizer of the event',
    type: String,
    example: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  })
  organizer: string;

  @ApiProperty({
    description: 'Does the event span the whole day',
    type: Boolean,
  })
  isAllDay: boolean;

  @ApiProperty({
    description: 'The recurrence rule of the event',
    type: String,
  })
  recurrenceRule: string;

  @ApiProperty({
    description: 'The recurrence exception of the event',
    type: String,
  })
  recurrenceException: string;

  @ApiProperty({
    description: 'Is the event readonly',
    type: Boolean,
  })
  isReadonly: boolean;

  @ApiProperty({
    description: 'the bartenders for the event',
    type: Array<UserContinental>,
  })
  bartenders: UserContinental[];
}

export type EventEditDto = Omit<EventCreateDto, 'organizer'>;
