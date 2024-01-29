import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DrinksModule } from '@/drinks/drinks.module';
import { MenuModule } from '@/menu/menu.module';
import { EventsModule } from '@/events/events.module';
import { UsersModule } from '@/users/users.module';
import { AuthenticationModule } from '@/authentication/authentication.module';
import { ContconfigModule } from '@/contconfig/contconfig.module';
import { MailerModule } from '@/mailer/mailer.module';

@Module({
  imports: [
    DrinksModule,
    MenuModule,
    EventsModule,
    UsersModule,
    AuthenticationModule,
    ContconfigModule,
    MailerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
