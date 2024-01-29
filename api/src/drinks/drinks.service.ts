import { Injectable } from '@nestjs/common';
import { DrinksDto } from './dto/DrinksDto';
import { DrinkType } from './drinks.types';
import { Drink } from './entities/Drink';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DrinksService {
  constructor(
    @InjectRepository(Drink) private readonly drinks: Repository<Drink>,
  ) {}

  getDrinks(): Promise<Drink[]> {
    return this.drinks.find();
  }

  getDrink(id: string): Promise<Drink> {
    return this.drinks.findOne({ where: { id } });
  }

  async updateDrink(id: string, data: Partial<DrinksDto>): Promise<void> {
    await this.drinks.update(id, data);
  }

  createDrink(drink: DrinksDto): Promise<Drink> {
    const drinkEntity = this.drinks.create();
    drinkEntity.name = drink.name;
    drinkEntity.type = drink.type;
    drinkEntity.price = drink.price;
    drinkEntity.description = drink.description;
    return this.drinks.save(drinkEntity);
  }

  async deleteDrink(id: string): Promise<void> {
    await this.drinks.delete(id);
  }

  findByType(type: DrinkType): Promise<Drink[]> {
    return this.drinks.find({ where: { type } });
  }
}
