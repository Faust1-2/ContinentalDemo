import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const schema = Joi.object({
  gmailUser: Joi.string().email(),
  gmailPassword: Joi.string(),
  gmailUserId: Joi.string(),
  gmailUserSecret: Joi.string(),
  gmailAuthCode: Joi.string(),
  gmailRefreshToken: Joi.string(),
  gmailAccessToken: Joi.string(),
});

export const MailerConfig = registerAs('mailer', async () => {
  const config = {
    gmailUser: process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASS,
    gmailUserId: process.env.GMAIL_USER_ID,
    gmailUserSecret: process.env.GMAIL_USER_SECRET,
    gmailAuthCode: process.env.GMAIL_AUTH_CODE,
    gmailRefreshToken: process.env.GMAIL_REFRESH_TOKEN,
    gmailAccessToken: process.env.GMAIL_ACCESS_TOKEN,
  };

  return schema.validate(config);
});
