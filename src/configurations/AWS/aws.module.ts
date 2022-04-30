import { AWSCredentialsService } from './credentials/credentials.service';
import { SesService } from './ses/ses.service';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3/s3.service';
import { Module } from '@nestjs/common';
import { SnsService } from './sns/sns.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [SesService, S3Service, AWSCredentialsService, SnsService],
  exports: [SesService, S3Service, AWSCredentialsService, SnsService],
})
export class AwsModule {}
