import { ContinentalRoles } from '../../shared/api-enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'the uuid of the User',
  })
  userId: string;

  @ApiProperty({
    description: 'the email of the User',
  })
  email: string;

  @ApiProperty({
    description: 'the role of the User',
  })
  role: ContinentalRoles;

  @ApiProperty({
    description: 'whether the User is confirmed',
  })
  isConfirmed: boolean;
}
