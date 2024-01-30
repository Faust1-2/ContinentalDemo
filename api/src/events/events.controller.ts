import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { EventCreateDto, EventEditDto } from './dto/event.dto';
import { Request } from 'express';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiBody({
    type: EventCreateDto,
  })
  create(@Body() event: EventCreateDto, @Req() req: Request) {
    return this.eventsService.create(event, req);
  }

  @Get()
  async findAll(@Query('upToDate') upToDate: boolean) {
    return await this.eventsService.findAll(upToDate);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  deleteOne(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  update(@Param('id') id: string, @Body() editEventDto: EventEditDto) {
    return this.eventsService.update(id, editEventDto);
  }

  @Get(':id/subscribe')
  @ApiParam({
    name: 'id',
    type: String,
  })
  isSubscribed(@Param('id') id: string, @Req() req: Request) {
    return false
  }

  @Post(':id/subscribe')
  @ApiParam({
    name: 'id',
    type: String,
  })
  subscribe(@Param('id') id: string, @Req() req: Request) {
    return this.eventsService.subscribe(id, req);
  }

  @Delete(':id/subscribe')
  @ApiParam({
    name: 'id',
    type: String,
  })
  unsubscribe(@Param('id') id: string, @Req() req: Request) {
    return this.eventsService.unsubscribe(id, req);
  }
}
