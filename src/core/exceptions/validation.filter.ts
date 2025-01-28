
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseError, ValidationError } from 'sequelize';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  getMessage(name: string){
    if (name === 'SequelizeUniqueConstraintError')
      return "El registro se encuentra duplicado dos veces"
    return name
  }
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 409;

    

    response
      .status(status)
      .json({
        statusCode: status,
        error: exception.name,
        message: this.getMessage(exception.name)
      });
  }
}
