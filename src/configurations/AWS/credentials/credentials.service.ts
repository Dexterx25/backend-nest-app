import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSCredentialsService {
  constructor(private readonly config: ConfigService) {}

  generate = new AWS.Credentials({
    accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID')!,
    secretAccessKey: this.config.get<string>('AWS_ACCESS_KEY')!,
  });
}
