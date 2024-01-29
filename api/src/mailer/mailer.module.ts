import { Module } from '@nestjs/common';
import { ContinentalMailingService } from './continental_mailing.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  exports: [ContinentalMailingService],
  controllers: [],
  providers: [ContinentalMailingService],
})
export class MailerModule {
  static forRoot() {
    return {
      global: true,
      module: MailerModule,
    };
  }
}
