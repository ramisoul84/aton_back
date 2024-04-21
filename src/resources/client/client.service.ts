import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    createClientDto.surname = createClientDto.surname.toUpperCase();
    createClientDto.name = createClientDto.name.toUpperCase();
    createClientDto.patronymic = createClientDto.patronymic?.toUpperCase();
    return this.clientRepository.save(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ relations: { user: true } });
  }

  findOne(accountNumber: number): Promise<Client | null> {
    return this.clientRepository.findOneBy({ accountNumber });
  }

  update(accountNumber: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(accountNumber, updateClientDto);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
