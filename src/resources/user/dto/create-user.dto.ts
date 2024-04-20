import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsString()
  @MinLength(4, { message: 'Username must have atleast 4 characters.' })
  username: string;

  @MinLength(8, { message: 'Username must have atleast 8 characters.' })
  @IsString()
  password: string;

  isAdmin?: boolean;

  createdAt?: Date;

  lastLoginAt?: Date;
}
