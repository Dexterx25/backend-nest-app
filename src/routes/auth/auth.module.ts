import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/database/repositories/auth';
import { UserRepository } from 'src/database/repositories/users';
import { JWTModule } from 'src/utils/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([ AuthRepository, UserRepository]), ConfigModule, JWTModule],
  providers: [AuthService],
  exports: [AuthService],

})
export class AuthModule {}