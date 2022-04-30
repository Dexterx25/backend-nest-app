import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';
import { AwsModule } from '../../../src/configurations/AWS';

@Module({
  imports: [AwsModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
