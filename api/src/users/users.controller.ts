import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { Request } from 'express';
import { UserContinental } from '@/users/entities/user.entity';
import { ApiBody } from '@nestjs/swagger';
import { RegisterUserDto } from '@/users/dto/RegisterUserDto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Patch(':id')
  @ApiBody({
    type: UserContinental,
  })
  updateUser(
    @Param('id') id: string,
    @Body() userUpdate: Partial<Omit<UserContinental, 'email'>>,
  ) {
    return this.userService.updateUser(id, userUpdate);
  }

  @Post('confirm/:token')
  @ApiBody({
    type: RegisterUserDto,
  })
  confirmUser(
    @Body() registerUserDto: { confirmUser: RegisterUserDto },
    @Param('token') token: string,
  ) {
    return this.userService.registerUser(registerUserDto, token);
  }

  @Get('subscriptions')
  getSubscriptions(@Req() req: Request) {
    return this.userService.getSubscriptions(req);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
