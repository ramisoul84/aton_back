import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@ApiTags('CLIENT')
@Controller('client')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') accountNumber: number) {
    return this.clientService.findOne(accountNumber);
  }

  @Patch(':id')
  update(
    @Param('id') accountNumber: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(accountNumber, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(id);
  }
}
