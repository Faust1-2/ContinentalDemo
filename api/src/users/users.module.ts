import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContinental } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/users.controller';
import { ContconfigModule } from '@/contconfig/contconfig.module';

@Module({
  imports: [ContconfigModule, TypeOrmModule.forFeature([UserContinental])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
