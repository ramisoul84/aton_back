import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  accountNumber: number;

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
    example: 'Ivanov',
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
    required: false,
    description: 'Date Of Birth',
    example: '12-12-1992',
  })
  dateOfBirth?: Date;

  @ApiProperty({
    required: true,
    description: 'Идентификационный номер налогоплательщика',
    example: '6449013711',
  })
  @Length(10)
  @IsString()
  inn: string;

  @ApiProperty({
    required: true,
    description: 'Full  Name',
    example: 'Ivan Ivanov Ivanovich',
  })
  @IsString()
  responsibleUser: string;

  @ApiProperty({
    required: true,
    description: 'Status',
    example: 'PENDING',
    default: 'PENDING',
  })
  status: 'PENDING' | 'IN_PROGRESS' | 'REJECTED' | 'CLOSED';

  @ApiProperty({
    required: true,
    description: 'User Id',
    example: '1',
  })
  userId: number;
}
