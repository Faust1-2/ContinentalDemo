import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { EventCreateDto, EventEditDto } from './dto/event.dto';
import { Event } from './entities/event.entity';
import { AuthenticationService } from '../authentication/authentication.service';
import { Request } from 'express';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly events: Repository<Event>,
    private userService: UsersService,
    private authService: AuthenticationService,
  ) {}

  async create(event: EventCreateDto, req: Request) {
    const newEvent = this.events.create();
    newEvent.name = event.name;
    newEvent.type = event.type;
    newEvent.startDate = event.startDate;
    newEvent.endDate = event.endDate;
    newEvent.organizer = await this.userService.getById(
      await this.authService.getConnectedUserId(req),
    );
    newEvent.isAllDay = event.isAllDay;
    newEvent.isReadonly = event.isReadonly;
    newEvent.recurrenceRule = event.recurrenceRule;
    newEvent.recurrenceException = event.recurrenceException;
    return this.events.save(newEvent);
  }

  findAll(upToDate = false) {
    if (upToDate)
      return this.events.find({
        where: { startDate: MoreThanOrEqual(new Date(Date.now())) },
        relations: ['bartenders', 'organizer'],
      });
    else
      return this.events.find({
        relations: ['organizer', 'bartenders'],
      });
  }

  findOne(id: string) {
    return this.events.findOne({
      where: { id },
      relations: ['bartenders', 'organizer'],
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
      relations: ['bartenders'],
    });
    const userId = await this.authService.getConnectedUserId(req);
    return event.bartenders.some((user) => user.userId === userId);
  }

  async subscribe(id: string, req: Request) {
    const event = await this.events.findOne({
      where: { id },
      relations: ['bartenders'],
    });
    const userId = await this.authService.getConnectedUserId(req);

    if (event.bartenders.some((user) => user.userId === userId))
      throw new HttpException('Already subscribed', 400);

    event.bartenders.push(await this.userService.getById(userId));
    return await this.events.save(event);
  }

  async unsubscribe(id: string, req: Request) {
    const event = await this.events.findOne({
      where: { id },
      relations: ['bartenders'],
    });
    const userId = await this.authService.getConnectedUserId(req);

    if (!event.bartenders.some((user) => user.userId === userId))
      throw new HttpException('Not subscribed', 400);

    event.bartenders = event.bartenders.filter(
      (user) => user.userId !== userId,
    );

    return await this.events.save(event);
  }
}
