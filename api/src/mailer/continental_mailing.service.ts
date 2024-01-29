import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class ContinentalMailingService {
  private oauthClient;
  private logger = new Logger('ContinentalMailing');
  private transport: nodemailer.Transporter<SentMessageInfo>;

  constructor(private configService: ConfigService) {
    this.oauthClient = new google.auth.OAuth2(
      this.configService.get('GMAIL_CLIENT_ID'),
      this.configService.get('GMAIL_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );
    this.oauthClient.setCredentials({
      refresh_token: this.configService.get('GMAIL_REFRESH_TOKEN'),
    });
  }

  async sendMail(mailOptions: Mail.Options) {
    const accessToken = await this.oauthClient.getAccessToken();

    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('GMAIL_USER'),
        clientId: this.configService.get('GMAIL_CLIENT_ID'),
        clientSecret: this.configService.get('GMAIL_CLIENT_SECRET'),
        refreshToken: this.configService.get('GMAIL_REFRESH_TOKEN'),
        accessToken: accessToken,
      },
    });

    try {
      await this.transport.sendMail(mailOptions);
      this.logger.log('Mail sent successfully');
    } catch (error) {
      this.logger.error('Error while sending mail', error);
    }
  }
}
