import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/database/repositories/auth';
import { UserRepository } from 'src/database/repositories/users';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([AuthRepository, UserRepository]), ConfigModule],
  providers: [UserService],
  exports: [UserService],

})
export class UserModule {}