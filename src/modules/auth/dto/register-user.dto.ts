import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    required: true,
    description: 'Last Name',
    example: 'Ivanov',
  })
  @IsString()
  surname: string;

  @ApiProperty({
    required: true,
    description: 'First Name',
    example: 'Ivan',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    description: 'Middle Name',
    example: 'Ivanovich',
  })
  @IsOptional()
  patronymic?: string;

  @ApiProperty({
    required: true,
    description: 'Username',
    example: 'ivan92',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(4, { message: 'Username must have atleast 4 characters.' })
  username: string;

  @ApiProperty({
    required: true,
    description: 'Username',
    example: 'ivan1992',
  })
  @IsString()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  password: string;
}
