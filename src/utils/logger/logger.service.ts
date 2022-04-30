import { LoggerService as LoggerServiceCommon, Logger } from '@nestjs/common';

export class LoggerService extends Logger implements LoggerServiceCommon {
  constructor(context: string) {
    super();
    this.setContext(context);
  }

  log(message: string) {
    super.log(message);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }
}
