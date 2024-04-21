import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Get All users from DB
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: { clients: true } });
  }
  // Get a certain user from DB by ID
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['clients'],
    });
  }

  // Get a certain user from DB by username
  findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}