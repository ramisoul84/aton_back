import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    required: true,
    description: 'Username',
    example: 'ivan92',
  })
  username: string;

  @ApiProperty({
    required: true,
    description: 'Password',
    example: 'ivan1992',
  })
  password: string;
}
