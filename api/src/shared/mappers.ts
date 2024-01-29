import { UserContinental } from '../users/entities/user.entity';
import { UserDto } from '../users/dto/UserDto';

export class Mapper {
  static toUserDto(user: UserContinental): UserDto {
    return {
      userId: user.userId,
      email: user.email,
      role: user.role,
      isConfirmed: user.isConfirmed,
    };
  }
}
