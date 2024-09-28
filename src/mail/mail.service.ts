import { Injectable, Logger } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { User } from 'src/user/user.service';

@Injectable()
export class MailService {
  public constructor(
    @InjectSendGrid() private readonly client: SendGridService,
  ) {}
  private readonly logger = new Logger(MailService.name);

  async sendEmail(subject: string, user: User): Promise<void> {
    try {
      const html = `<h4>Hi ${user.firstName}</h4><p>Welcome! You have been added to the FamilyArchive user database</p>`;
      const para = `<p>Please check your login credentials below</p>`;
      const body = `${html}${para}<p>Use your email to log into the app and use <b>${user.password}</b></p>`;

      const options = {
        to: user.email,
        from: 'aubrey@sgela-ai.tech',
        subject,
        html: body,
        cc: 'malengadev@gmail.com',
      };

      const sent = await this.client.send(options);
      this.logger.log(`Email send result: ${sent}`);
      this.logger.log(`Email sent successfully to ${user.email}`);
    } catch (error) {
      const msg = `Error sending email to ${user.email}: ${error}`;
      this.logger.error(msg);
      throw new Error(msg);
    }
  }
}
