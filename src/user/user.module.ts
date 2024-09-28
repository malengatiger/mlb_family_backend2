import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailService } from 'src/mail/mail.service';
import { FirebaseAdmin } from 'src/utils/firebase_util';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, MailService, FirebaseAdmin],
})
export class UserModule {}
