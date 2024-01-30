import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { EventCreateDto, EventEditDto } from './dto/event.dto';
import { Event } from './entities/event.entity';
import { Request } from 'express';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly events: Repository<Event>,
    private userService: UsersService,
  ) {}

  async create(event: EventCreateDto, req: Request) {
    const newEvent = this.events.create();
    newEvent.name = event.name;
    newEvent.type = event.type;
    newEvent.startDate = event.startDate;
    newEvent.endDate = event.endDate;
    newEvent.isAllDay = event.isAllDay;
    newEvent.isReadonly = event.isReadonly;
    newEvent.recurrenceRule = event.recurrenceRule;
    newEvent.recurrenceException = event.recurrenceException;
    return this.events.save(newEvent);
  }

  findAll(upToDate = false) {
    if (upToDate) {
      const result = this.events.find({
        where: { startDate: MoreThanOrEqual(new Date(Date.now())) },
      }).then((events) => events);
      return result;
    }
    else
      return this.events.find().then((events) => events);
  }

  findOne(id: string) {
    return this.events.findOne({
      where: { id },
    });
  }

  async update(id: string, editEventDto: EventEditDto) {
    return this.events.update(id, editEventDto);
  }

  async remove(id: string) {
    return await this.events.delete(id);
  }

  async isSubscribed(id: string, req: Request) {
    const event = await this.events.findOne({
      where: { id },
    });
    return false;
  }

  async subscribe(id: string, req: Request) {
    const event = await this.events.findOne({
      where: { id },
      relations: ['bartenders'],
    });

    return event;
  }

  async unsubscribe(id: string, req: Request) {
    const event = await this.events.findOne({
      where: { id },
      relations: ['bartenders'],
    });

    return await this.events.save(event);
  }
}
