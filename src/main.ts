import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyUtils } from './utils/my-utils';
import * as os from 'os';
import { ErrorsInterceptor } from './middleware/errors.interceptor';
import { AuthMiddleware } from './middleware/auth.middleware';

const mm = '🔵 🔵 🔵 🔵 🔵 🔵 MLB Family Archive 🔵 🔵';
const env = process.env.NODE_ENV;
Logger.log(`${mm} NODE_ENV : ${env}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new AuthMiddleware().use); // Apply middleware globally

  const port = MyUtils.getPort();
  Logger.log(`${mm} ... running on port : ${port} `);
  // Get Server IP Address
  const interfaces = os.networkInterfaces();
  let serverIP = '127.0.0.1'; // Default to localhost

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        serverIP = iface.address;
        break; // Use the first available external IPv4 address
      }
    }
  }

  Logger.log(`\n${mm} ...🔆  running on: http://${serverIP}:${port}`);

  // Access environment variables
  const requiredEnvVars = [
    'MAIL_HOST',
    'MAIL_USER',
    'MAIL_PASS',
    'SENDGRID_API_KEY',
    'BUCKET_NAME',
    'CLOUD_STORAGE_DIRECTORY',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      Logger.error(`${mm} Environment variable ${envVar} 😈😈😈 is missing!`);
      // process.exit(1); // Exit the application if a required variable is missing
    } else {
      Logger.log(
        `${mm} Environment variable ${envVar} is present. 🥬🥬🥬 ${process.env[envVar]}`,
      );
    }
  }

  app.setGlobalPrefix('api/v1');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('FamilyArchive Backend')
    .setDescription('The Family Archive API manages the backend data ')
    .setVersion('1.0')
    .addTag('family')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  Logger.log(`${mm} ... Swagger set up .....`);
  // app.use(helmet());
  app.enableCors();
  Logger.log(`${mm} ... CORS set up .....`);

  app.useGlobalInterceptors(new ErrorsInterceptor());
  Logger.log(`${mm} ... ErrorsInterceptor set up .....`);

  await app.listen(port);
}
bootstrap();
