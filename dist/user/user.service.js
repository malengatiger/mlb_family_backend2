"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
const mail_service_1 = require("../mail/mail.service");
const firebase_util_1 = require("../utils/firebase_util");
const tag = '😎 😎 😎 😎 UserService 😎';
let UserService = class UserService {
    constructor(emailService, fs) {
        this.emailService = emailService;
        this.fs = fs;
    }
    async getUsers() {
        return await this.fs.getUsers();
    }
    async createUsers(users) {
        const userResults = [];
        for (let index = 0; index < users.length; index++) {
            const u = users[index];
            const res = await this.createUser(u);
            userResults.push(res);
        }
        return userResults;
    }
    async createUser(user) {
        common_1.Logger.log(`\n\n${tag} ... create User on Firebase auth and add to Firestore .... \n`);
        let result;
        let password = user.password;
        if (!password) {
            password = `${this.generateRandomString(6)}_${new Date().getTime()}}`;
        }
        try {
            firebase_admin_1.default
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
                common_1.Logger.log(`${tag} Firebase auth user created: ${JSON.stringify(userRec, null, 2)}`);
                user.url = null;
                user.thumbUrl = null;
                user.dateRegistered = new Date().toISOString();
                const res = await firebase_admin_1.default.firestore().collection('users').add(user);
                common_1.Logger.log(`${tag} result from Firestore: ${JSON.stringify(res)}`);
                common_1.Logger.log(`\n${tag} 🥬 user added to Firestore: 🥬🥬 ${JSON.stringify(user, null, 2)} 🥬🥬\n\n`);
                result.password = password;
                common_1.Logger.log(`${tag} ... sending email to ${result.email}`);
                try {
                    await this.emailService.sendEmail('FamilyArchive Welcome Email', result);
                }
                catch (error) {
                    common_1.Logger.debug(`${tag} createUser: email send failed. ${error}`);
                }
                common_1.Logger.debug(`${tag} returning result: ${JSON.stringify(result)}`);
                return result;
            })
                .catch((error) => {
                const msg = `${tag} 😈😈 Error creating new user: ${error} 😈😈😈`;
                common_1.Logger.error(msg, error);
                throw new Error(msg);
            });
            return result;
        }
        catch (e) { }
    }
    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        firebase_util_1.FirebaseAdmin])
], UserService);
//# sourceMappingURL=user.service.js.map