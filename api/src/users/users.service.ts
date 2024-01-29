import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserContinental } from '@/users/entities/user.entity';
import { Repository } from 'typeorm';
import { NewUserDto } from '@/users/dto/NewUserDto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ContinentalMailingService } from '@/mailer/continental_mailing.service';
import mail_template from '@/mailer/template/mail_template';
import { RegisterUserDto } from '@/users/dto/RegisterUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  logger = new Logger();

  constructor(
    @InjectRepository(UserContinental) private users: Repository<UserContinental>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly continentalMailing: ContinentalMailingService,
  ) {}

  async getByEmail(email: string, withPassword?: boolean) {
    let user: UserContinental;

    if (withPassword) {
      user = await this.users.findOne({
        where: { email },
        select: ['userId', 'email', 'password'],
      });
    } else {
      user = await this.users.findOneBy({ email });
    }

    if (!user)
      throw new HttpException(
        'A user with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async getById(userId: string) {
    const user = await this.users.findOne({
      where: {
        userId,
      },
      select: ['userId', 'email', 'role', 'isConfirmed'],
    });

    if (!user)
      throw new HttpException(
        'No user found with such id',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async createUser(user: NewUserDto) {
    const newUser = this.users.create(user);

    let token = '';
    let savedUser: UserContinental;

    try {
      savedUser = await this.users.save(newUser);
    } catch (error) {
      this.logger.error('Error while saving user', error);
      throw new HttpException(
        'A user with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      token = this.jwtService.sign(
        { userId: savedUser.userId },
        { secret: this.configService.get('JWT_SECRET') },
      );
      await this.continentalMailing.sendMail({
        to: user.email,
        from: 'Welcome <welcome@continental-efrei.fr>',
        subject: 'Bienvenue sur le site de Continental',
        html: mail_template(
          `${this.configService.get(
            'FRONT_BASE_URL',
          )}/confirm_account/${token}`,
        ),
      });
    } catch (error) {
      this.logger.error('Error while sending mail', error);
    }

    this.logger.log(`UserContinental ${newUser.email} created`);

    return newUser;
  }

  async registerUser(
    { confirmUser }: { confirmUser: RegisterUserDto },
    registrationToken: string,
  ) {
    const decodedToken = this.jwtService.verify<{ userId: string }>(
      registrationToken,
      this.configService.get('JWT_SECRET'),
    );

    if (!decodedToken)
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);

    if (confirmUser.password !== confirmUser.rePassword)
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);

    const hashedPassword = await this.hashPassword(confirmUser.password);
    const baseUser = await this.updateUser(decodedToken['userId'], {
      name: confirmUser.lastName,
      surname: confirmUser.firstName,
      password: hashedPassword,
      isConfirmed: true,
    });

    if (!baseUser)
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);

    this.logger.log(
      `UserContinental ${confirmUser.firstName} ${confirmUser.lastName} confirmed`,
    );

    return baseUser;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }

  async updateUser(userId: string, userUpdate: Partial<Omit<UserContinental, 'email'>>) {
    const user = await this.users.update({ userId }, userUpdate);
    if (!user)
      throw new HttpException(
        'No user found with such id',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async getUsers() {
    return await this.users.find({
      select: ['userId', 'name', 'surname', 'email', 'role', 'isConfirmed'],
    });
  }

  async getSubscriptions(req: Request) {
    const userId = this.jwtService.decode(req.cookies['Authentication'])[
      'userId'
    ];
    const user = await this.users.findOne({
      where: {
        userId,
      },
      relations: ['bartendingEvents'],
    });

    return user.bartendingEvents;
  }
}
