import { SendGridService } from '@ntegral/nestjs-sendgrid';
import { User } from 'src/user/user.service';
export declare class MailService {
    private readonly client;
    constructor(client: SendGridService);
    private readonly logger;
    sendEmail(subject: string, user: User): Promise<void>;
}
