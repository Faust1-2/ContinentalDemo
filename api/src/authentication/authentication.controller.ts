import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { NewUserDto } from '../users/dto/NewUserDto';
import { RequestWithUser } from './authentication.interfaces';
import { Request, Response } from 'express';
import { Mapper } from 'src/shared/mappers';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LogUserDto } from '../users/dto/LogUserDto';
import LocalAuthGuard from './local-auth.guard';
import JwtAuthGuard from './jwt-auth.guard';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() user: NewUserDto) {
    return this.authenticationService.register(user);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LogUserDto,
  })
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const user = request.user;
    const cookie = this.authenticationService.getCookieWithJwtToken(
      user.userId,
    );

    response.setHeader('Set-Cookie', cookie);

    user.password = undefined;

    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogout(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return Mapper.toUserDto(request.user);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() request: Request) {
    return this.authenticationService.getMe(request);
  }
}
