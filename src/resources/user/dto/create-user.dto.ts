import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
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
  @IsString()
  patronymic?: string;

  @ApiProperty({
    required: true,
    description: 'Username',
    example: 'ivan92',
  })
  @IsString()
  @MinLength(4, { message: 'Username must have atleast 4 characters.' })
  username: string;

  @ApiProperty({
    required: true,
    description: 'Username',
    example: 'ivan1992',
  })
  @MinLength(8, { message: 'Username must have atleast 8 characters.' })
  @IsString()
  password: string;

  @IsOptional()
  lastLoginAt?: Date;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
