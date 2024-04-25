import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/resources/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login-res';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterUserDto): Promise<User> {
    const { username } = user;
    const foundUser = await this.userRepository.findOneBy({ username });
    if (foundUser) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    const count = await this.userRepository.count();
    const newUser = new User();
    newUser.surname = user.surname.toUpperCase();
    newUser.name = user.name.toUpperCase();
    newUser.patronymic = user.patronymic?.toUpperCase();
    newUser.username = username.toLowerCase();
    newUser.password = await bcrypt.hash(user.password, 10);
    newUser.isAdmin = count === 0 ? true : false;
    newUser.createdAt = new Date();
    return this.userRepository.save(newUser);
  }

  async login(user: LoginUserDto): Promise<LoginResponse> {
    const { username, password } = user;
    const foundUser: User = await this.userRepository.findOneBy({ username });
    if (!foundUser) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    const isMatch: boolean = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update(foundUser.id, {
      lastLoginAt: new Date(),
    });
    const payload = { sub: foundUser.id, username: foundUser.username };
    const access_token = await this.jwtService.signAsync(payload);
    delete foundUser.password;
    const res = {
      id: foundUser.id,
      surname: foundUser.surname,
      name: foundUser.name,
      patronymic: foundUser.patronymic,
      username: foundUser.username,
      isAdmin: foundUser.isAdmin,
      access_token: access_token,
    };

    return res;
  }
}
