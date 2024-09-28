import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
const mm = '🔑🔑🔑🔑🔑 AuthMiddleware 🔐 ';
const errorMessage = '🔴 🔴 🔴 Request is Unauthorized';

interface AuthenticatedRequest extends Request {
  user: admin.auth.DecodedIdToken;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    Logger.log(
      `${mm} request headers: ${JSON.stringify(req.headers, null, 2)} `,
    );

    Logger.debug(
      `${mm} request originalUrl: ${JSON.stringify(req.originalUrl, null, 2)} `,
    ); // This line will print the requested URL

    if (process.env.NODE_ENV == 'development') {
      Logger.debug(
        `${mm} 🔴 letting you into the club without a ticket! 🔵 🔵 🔵 `,
      );
      next();
      return;
    } else {
      Logger.debug(
        `${mm} 🔴 🔴 🔴 🔴 We are the TSA and we gonna look up your ass!! 🔴 🔴 🔴`,
      );
    }

    if (!authToken) {
      Logger.error(`${mm} authentication token not found in request header 🔴`);
      return res.status(401).json({
        message: errorMessage,
        statusCode: 401,
        date: new Date().toISOString(),
      });
    }
    try {
      // Logger.log(`${mm} authentication starting: 🔵 authToken: ${authToken}`);
      // Verify the authentication token using Firebase Admin SDK
      //await this.fbService.initializeFirebase(); Bearer
      const token = authToken.substring(7);
      // Logger.log(`${mm} authentication continua: 🔵 token: ${token}`);

      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken; // Set the authenticated user in the request object
      // Logger.log(`${mm} authentication seems OK; ✅ req: ${req}`);

      next();
    } catch (error) {
      const msg = `${mm} 😈😈😈 Error verifying authentication token 😈😈😈: 🔴 ${error} 🔴`;
      Logger.error(msg);
      return res.status(403).json({
        message: msg,
        statusCode: 403,
        date: new Date().toISOString(),
      });
    }
  }
}
