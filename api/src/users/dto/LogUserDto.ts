import { ApiProperty } from '@nestjs/swagger';

export class LogUserDto {
  @ApiProperty({
    description: 'email of the user',
  })
  email: string;

  @ApiProperty({
    description: 'password of the user',
  })
  password: string;
}
