import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomMemberRepository, RoomsRepository } from 'src/database/repositories';
import { AuthRepository } from 'src/database/repositories/auth';
import { UserRepository } from 'src/database/repositories/users';
import { UserController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([AuthRepository, UserRepository, RoomsRepository, RoomMemberRepository]), ConfigModule],
  providers: [RoomsService],
  exports: [RoomsService],

})
export class RoomsModule {}