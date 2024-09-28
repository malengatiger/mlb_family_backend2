// First we will create a module in nestjs that would
// be responsible for dealing with mail related services.
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
