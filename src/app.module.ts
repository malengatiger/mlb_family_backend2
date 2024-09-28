import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdmin } from './utils/firebase_util';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { MailModule } from './mail/mail.module';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './middleware/errors.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // Make ConfigService globally available
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('SENDGRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AppController, MailController],
  providers: [
    AppService,
    FirebaseAdmin,
    MailService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
