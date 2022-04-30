import { Injectable } from '@nestjs/common';
import * as Puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  doc: Puppeteer.Browser | undefined;

  async genMinute(_filename: string, develop: string, isShow?:boolean) {
    this.doc = await Puppeteer.launch({
      headless: isShow,

      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-dev-shm-usage',
      ],
    });
    const page = await this.doc.newPage();
   // var css = cssb.join('');
    await page.setContent(develop);
    const pdf = await page.pdf({
      format: 'a4',
      headerTemplate:'<div></div>',
      displayHeaderFooter: true,
      margin: {
        top: '105px',
        bottom: '50px',
        right: '30px',
        left: '30px',
      },
    });
    await this.doc.close();
    return pdf;
  }
}
