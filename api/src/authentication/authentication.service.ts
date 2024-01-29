import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostgresErrorCode } from '../shared/api-enums';
import { NewUserDto } from '../users/dto/NewUserDto';
import { Mapper } from '../shared/mappers';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './authentication.interfaces';
import { LogUserDto } from '../users/dto/LogUserDto';
import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyToken(token: string) {
    return this.jwtService.verify(token, this.configService.get('JWT_SECRET'));
  }

  async register(user: NewUserDto) {
    try {
      const loggedUser = await this.usersService.createUser(user);
      return Mapper.toUserDto(loggedUser);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async authenticateUser(user: LogUserDto) {
    try {
      const loggedUser = await this.usersService.getByEmail(user.email, true);
      await this.verifyPassword(user.password, loggedUser.password);
      return Mapper.toUserDto(loggedUser);
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`,
    });
    return `Authentication=${token}; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async getMe(req: Request) {
    const cookies = req.cookies;
    const token = cookies['Authentication'];
    const payload = this.jwtService.verify(
      token,
      this.configService.get('JWT_SECRET'),
    );
    const user = await this.usersService.getById(payload['userId']);
    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    return Mapper.toUserDto(user);
  }

  async getConnectedUserId(req: Request) {
    const cookies = req.cookies;
    const token = cookies['Authentication'];
    const payload = this.jwtService.verify(
      token,
      this.configService.get('JWT_SECRET'),
    );
    console.log(payload);
    return payload['userId'] as string;
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const matchingPasswords = await bcrypt.compare(password, hashedPassword);

    if (!matchingPasswords) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
