import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContinental } from '../users/entities/user.entity';
import { Drink } from '../drinks/entities/Drink';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [UserContinental, Drink, Event],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
