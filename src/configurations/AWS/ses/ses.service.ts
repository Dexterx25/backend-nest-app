import { AWSCredentialsService } from '../credentials/credentials.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../../utils/logger';
import * as AWS from 'aws-sdk';

@Injectable()
export class SesService {
  private readonly logger: LoggerService = new LoggerService('SES');
  private SES!: AWS.SES;
  constructor(
    private readonly credentials: AWSCredentialsService,
    private readonly config: ConfigService,
  ) {
    this.setup();
  }

  private setup = () => {
    this.SES = new AWS.SES({
      credentials: this.credentials.generate,
      region: this.config.get<string>('AWS_S3_REGION'),
    });
  };

  send = async (
    to: string[],
    subject: string = 'NO_SUBJECT',
    html?: string,
  ) => {
    this.logger.log(`Sending email to: ${to}`);
    const data: any = {
      Destination: {
        ToAddresses: to,
      },
      ConfigurationSetName: this.config.get<string>('AWS_NAMESPACE'),
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: this.config.get<string>('AWS_EMAIL'),
    };
    await this.SES.sendEmail(data).promise();
  };
}
