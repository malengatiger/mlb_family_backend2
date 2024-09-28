import { Injectable, Logger } from '@nestjs/common';
import admin from 'firebase-admin';
import { MailService } from 'src/mail/mail.service';
import { FirebaseAdmin } from 'src/utils/firebase_util';
const tag = '😎 😎 😎 😎 UserService 😎';

@Injectable()
export class UserService {
  constructor(
    private readonly emailService: MailService,
    private readonly fs: FirebaseAdmin,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.fs.getUsers();
  }
  async createUsers(users: User[]) {
    const userResults: User[] = [];

    for (let index = 0; index < users.length; index++) {
      const u = users[index];
      const res = await this.createUser(u);
      userResults.push(res);
    }
    return userResults;
  }
  async createUser(user: User): Promise<any> {
    Logger.log(
      `\n\n${tag} ... create User on Firebase auth and add to Firestore .... \n`,
    );
    let result: User;
    let password = user.password;
    if (!password) {
      password = `${this.generateRandomString(6)}_${new Date().getTime()}}`;
    }
    try {
      admin
        .auth()
        .createUser({
          email: user.email,
          emailVerified: false,
          phoneNumber: user.cellphone,
          password: user.password,
          displayName: `${user.firstName} ${user.lastName}`,
          disabled: false,
        })
        .then(async (userRec) => {
          user.userId = userRec.uid;
          result = user;
          user.password = null;
          Logger.log(
            `${tag} Firebase auth user created: ${JSON.stringify(userRec, null, 2)}`,
          );
          user.url = null;
          user.thumbUrl = null;
          user.dateRegistered = new Date().toISOString();

          const res = await admin.firestore().collection('users').add(user);
          Logger.log(`${tag} result from Firestore: ${JSON.stringify(res)}`);
          Logger.log(
            `\n${tag} 🥬 user added to Firestore: 🥬🥬 ${JSON.stringify(user, null, 2)} 🥬🥬\n\n`,
          );
          result.password = password;
          Logger.log(`${tag} ... sending email to ${result.email}`);
          try {
            await this.emailService.sendEmail(
              'FamilyArchive Welcome Email',
              result,
            );
          } catch (error) {
            Logger.debug(`${tag} createUser: email send failed. ${error}`);
          }
          Logger.debug(`${tag} returning result: ${JSON.stringify(result)}`);
          return result;
        })
        .catch((error) => {
          const msg = `${tag} 😈😈 Error creating new user: ${error} 😈😈😈`;
          Logger.error(msg, error);
          throw new Error(msg);
        });

      return result;
    } catch (e) {}
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
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
