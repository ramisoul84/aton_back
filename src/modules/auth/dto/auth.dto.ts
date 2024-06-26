import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
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

/*
export interface LoginResponse {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  username: string;
  isAdmin: boolean;
  access_token: string;
}
*/
