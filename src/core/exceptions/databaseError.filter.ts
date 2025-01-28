
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';

@Catch(DatabaseError)
export class DatabaseErrorFilter implements ExceptionFilter {
  catch(exception: DatabaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 409;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message
      });
  }
}
