import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from 'src/resources/user/dto/create-user.dto';
import { User } from 'src/resources/user/entities/user.entity';
import { UserService } from 'src/resources/user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  async login(user: AuthDto) {
    const { username, password } = user;
    const userExists: User = await this.userService.findOneByUsername(username);
    if (!userExists) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND);
    }
    const passwordMatches: boolean = await bcrypt.compare(
      password,
      userExists.password,
    );
    if (!passwordMatches) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND);
    }
    await this.userService.update(userExists.id, {
      lastLoginAt: new Date(),
    });
    const tokens = await this.getTokens(userExists.id, userExists.username);
    await this.updateRefreshToken(userExists.id, tokens.refreshToken);
    return {
      id: userExists.id,
      username: userExists.username,
      isAdmin: userExists.isAdmin,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(id: number) {
    return this.userService.update(id, { refreshToken: null });
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(id: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '1d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.userService.findOne(id);
    if (!user || !user.refreshToken)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    console.log(refreshTokenMatches);
    if (!refreshTokenMatches)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
