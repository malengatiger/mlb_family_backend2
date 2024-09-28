import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
interface AuthenticatedRequest extends Request {
    user: admin.auth.DecodedIdToken;
}
export declare class AuthMiddleware implements NestMiddleware {
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
export {};
