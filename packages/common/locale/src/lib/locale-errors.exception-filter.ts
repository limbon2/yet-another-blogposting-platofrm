import { Request, Response } from 'express';
import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Catch(HttpException)
export class LocaleHttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const i18n = I18nContext.current(host);

    const msgKey = `errors.${status.toString()}`;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: i18n?.t(msgKey, { defaultValue: '[HTTP_EXCEPTION_FILTER]: Something went wrong' }),
    });
  }
}
