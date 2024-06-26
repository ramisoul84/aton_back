import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new User
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findOneByUsername(createUserDto.username);
    if (userExists) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    const count = await this.userRepository.count();
    const newUser = new User();
    newUser.surname = createUserDto.surname.toUpperCase();
    newUser.name = createUserDto.name.toUpperCase();
    newUser.patronymic = createUserDto.patronymic?.toUpperCase();
    newUser.username = createUserDto.username.toLowerCase();
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    newUser.isAdmin = count === 0 ? true : false;
    newUser.createdAt = new Date();
    const addedUser = await this.userRepository.save(newUser);
    delete addedUser.password;
    return addedUser;
  }

  // Get All users from DB
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: { clients: true },
    });
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
