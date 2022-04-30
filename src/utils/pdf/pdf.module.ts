import { DayJsModule } from '../dayjsFormatter';
import { PdfService } from './pdf.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PdfService],
  imports: [DayJsModule],
  exports: [PdfService],
})
export class PdfModule {}
