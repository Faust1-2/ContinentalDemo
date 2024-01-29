import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  @ApiProperty({
    description: 'email of the user',
  })
  email: string;
}
