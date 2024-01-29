import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { DrinksModule } from '@/drinks/drinks.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DrinksModule, HttpModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
