import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { UserDto } from '../users/dto/UserDto';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserDto> {
    if (!password)
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    return await this.authenticationService.authenticateUser({
      email,
      password,
    });
  }
}
