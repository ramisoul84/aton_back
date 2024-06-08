import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './resources/client/client.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/db/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './resources/user/entities/user.entity';
import { Client } from './resources/client/entities/client.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DatabaseModule,
    ClientModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
