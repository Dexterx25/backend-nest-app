import { AWSCredentialsService } from '../credentials/credentials.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class SnsService {
  private logger = new Logger('SNS');
  private SES!: AWS.SNS;
  constructor(
    private readonly credentials: AWSCredentialsService,
    private readonly configService: ConfigService,
  ) {
    this.setup();
  }

  private setup = async () => {
    this.SES = new AWS.SNS({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: this.credentials.generate,
    });
  };

  send = async (phone: string, message: string) => {
    try {
      this.logger.log(`Sending SMS to: ${phone} message: ${message}`);
      await this.SES.publish({
        Message: message,
        PhoneNumber: phone,
        MessageAttributes: {
          'AWS.SNS.SMS.SMSType': {
            DataType: 'String',
            StringValue: 'Transactional',
          },
        },
      }).promise();
    } catch (error) {
      console.error(error);
    }
  };
}
