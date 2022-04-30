import { Module } from '@nestjs/common';
//import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../../configurations/redis';
import { GuardsService } from './guards.service';

@Module({
  imports: [RedisModule],
  exports: [GuardsService],
  providers: [GuardsService]
})

export class GuardsModule { }
