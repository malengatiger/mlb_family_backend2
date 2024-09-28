import { MailService } from 'src/mail/mail.service';
import { FirebaseAdmin } from 'src/utils/firebase_util';
export declare class UserService {
    private readonly emailService;
    private readonly fs;
    constructor(emailService: MailService, fs: FirebaseAdmin);
    getUsers(): Promise<User[]>;
    createUsers(users: User[]): Promise<User[]>;
    createUser(user: User): Promise<any>;
    private generateRandomString;
}
export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cellphone: string;
    url: string;
    thumbUrl: string;
    dateRegistered: string;
}
