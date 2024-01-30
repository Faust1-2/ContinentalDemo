import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DrinksModule } from '@/drinks/drinks.module';
import { MenuModule } from '@/menu/menu.module';
import { EventsModule } from '@/events/events.module';
import { UsersModule } from '@/users/users.module';
import { ContconfigModule } from '@/contconfig/contconfig.module';
import { MailerModule } from '@/mailer/mailer.module';

@Module({
  imports: [
    DrinksModule,
    MenuModule,
    EventsModule,
    UsersModule,
    ContconfigModule,
    MailerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
