import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './resources/client/client.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './resources/user/entities/user.entity';
import { Client } from './resources/client/entities/client.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [User, Client],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ClientModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
