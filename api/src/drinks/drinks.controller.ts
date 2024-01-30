import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { DrinksDto } from './dto/DrinksDto';
import { Drink } from './entities/Drink';
import { DrinksService } from './drinks.service';
import { DrinkType } from './drinks.types';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('drinks')
@Controller('drinks')
export class DrinksController {
  constructor(private service: DrinksService) {}

  @Post()
  async createDrink(
    @Body() drink: DrinksDto,
    @Res() response: Response,
  ): Promise<void> {
    const d = await this.service.createDrink(drink);
    return response.redirect(`${response.req.headers.host}/${d.id}`);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  deleteDrink(@Param('id') id: string): Promise<void> {
    return this.service.deleteDrink(id);
  }

  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
  })
  getDrinks(@Query('type') type?: DrinkType): Promise<Drink[]> {
    if (type) return this.service.findByType(type);
    return this.service.getDrinks();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  getDrink(@Param('id') id: string): Promise<Drink> {
    return this.service.getDrink(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  updateDrink(@Param('id') id: string, @Body() data: DrinksDto) {
    return this.service.updateDrink(id, data);
  }
}
