import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const mm: string = '🔴🔴🔴 ErrorsInterceptor';
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(handleError));

    function handleError(err: KasieError) {
      Logger.log(`${mm} ... 😈😈 handling error: ${err} `);
      return throwError(
        () =>
          new KasieError(
            HttpStatus.BAD_REQUEST,
            `😈😈 ${err.message}`,
            `${next.handle.name}`,
          ),
      );
    }
  }
}

export class KasieError {
  statusCode: number;
  message: string;
  date: string;
  request: string;
  constructor(statusCode: number, message: string, request: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.request = request;
    this.date = new Date().toISOString();
  }
}
