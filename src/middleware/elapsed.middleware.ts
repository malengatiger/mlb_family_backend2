import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const mm = ' 🔇 🔇 🔇 ElapsedTimeMiddleware';
@Injectable()
export class ElapsedTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', async () => {
      const elapsed = (Date.now() - start) / 1000;
      Logger.log(
        `${mm} ${req.originalUrl} took 🌸🌸🌸 ${elapsed} seconds 🔴 🔴 statusCode: ${res.statusCode}`,
      );
      if (res.statusCode > 201) {
        // //send message & write to database
        // const x: KasieError = new KasieError(
        //   `Error on Kasie Backend, statusCode: ${res.statusCode} - ${res.statusMessage}`,
        //   HttpStatus.BAD_REQUEST,
        // );
        // await this.kasieErrorModel.create(x);
        // Logger.debug(`${mm} KasieError added to database `);
        // await this.messagingService.sendKasieErrorMessage(x);
      }
    });

    next();
  }
}
