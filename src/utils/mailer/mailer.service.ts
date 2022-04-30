import { IMail, IRecoverPass, ISign } from './interfaces/mailer.interface';
import { Injectable } from '@nestjs/common';
import { SesService } from '../../configurations/AWS';
import { renderFile } from 'pug';
import { existsSync } from 'fs';
import { join } from 'path';
import { dataToNotifyMail } from './interfaces';
import { postEmailService } from '../recurses/external_endpoints/emailServices';

@Injectable()
export class MailerService {
  private templatePath = join(
    process.cwd(),
    'utils',
    'mailer',
    'templates',
  );
  constructor(private readonly ses: SesService) {
    if (!existsSync(this.templatePath)) {
      const src = __dirname.split('/');
      this.templatePath = join(src.join('/'), 'templates');
    }
  }

  sendRecoverPass = async (to: string[], params: IRecoverPass) => {
    const html = renderFile(join(this.templatePath, 'recover.pug'), params);
    return await this.ses.send(to, 'Recuperación de contraseña', html);
  };

  sendNotification = async (to: string[], topic: string, data: IMail) => {
    try {
      const template = join(this.templatePath, 'notificationTemplate.pug');
      const html = renderFile(template, data);
      return await this.ses.send(to, topic, html);
    } catch (error) {
      console.error(error);
    }
  };

  sendSign = async (to: string, topic: string, data: ISign) => {
    try {
      const template = join(this.templatePath, 'signTemplate.pug');
      const html = renderFile(template, {
        advertisement: data.signal,
        buttonTitle: 'Firmar Acta',
        headerTitle: `Reunión de comité ${data.meeting}`,
        farewell: 'Alicanto',
        message: data.message,
        url: data.url,
      });
      return await this.ses.send([to], topic, html);
    } catch (error) {
      console.error(error);
    }
  };

  notifyNovelties = async (
    to: string[],
    header: string,
    message: string,
    hour: string,
    theme: string,
    place: string,
    topic?: string,
  ) => {
    try {
      const template = join(this.templatePath, 'novelties/notification.pug');
      const html = renderFile(template, {
        headerTitle: header,
        farewell: 'Novelties',
        message,
        place,
        theme,
        hour,
      });
      return await this.ses.send(to, topic ? topic : 'topic', html);
    } catch (error) {
      console.error(error);
    }
  };
  notifyNoveltiesWithMailerService = async ({email, targets}:dataToNotifyMail) => {
    const dataBeforeSend = {email, targets}
    console.log('data before send-->', dataBeforeSend)
   try {
    const dataRespon =  await postEmailService({email, targets})
    console.log('resondata-->', dataRespon);
   } catch (error) {
     return error
   }
  };

  genericNotification = async (
    to: string[],
    topic: string,
    farewell: string,
    headerTitle: string,
    message: string,
    items: string[],
  ) => {
    try {
      const template = join(
        this.templatePath,
        'genericNotificationTemplate.pug',
      );
      const html = renderFile(template, {
        headerTitle,
        farewell,
        message,
        items,
      });
      return await this.ses.send(to, topic, html);
    } catch (error) {
      console.error(error);
    }
  };
}
