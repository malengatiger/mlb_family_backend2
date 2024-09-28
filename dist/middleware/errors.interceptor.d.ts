import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export declare class KasieError {
    statusCode: number;
    message: string;
    date: string;
    request: string;
    constructor(statusCode: number, message: string, request: string);
}
