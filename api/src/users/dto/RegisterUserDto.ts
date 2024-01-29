import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'chosen password of the user',
  })
  password: string;

  @ApiProperty({
    description: 'confirmation of chosen password of the user',
  })
  rePassword: string;

  @ApiProperty({
    description: 'name of the user',
  })
  lastName: string;

  @ApiProperty({
    description: 'surname of the user',
  })
  firstName: string;
}
