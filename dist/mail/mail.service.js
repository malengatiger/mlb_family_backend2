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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
let MailService = MailService_1 = class MailService {
    constructor(client) {
        this.client = client;
        this.logger = new common_1.Logger(MailService_1.name);
    }
    async sendEmail(subject, user) {
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
        }
        catch (error) {
            const msg = `Error sending email to ${user.email}: ${error}`;
            this.logger.error(msg);
            throw new Error(msg);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_sendgrid_1.InjectSendGrid)()),
    __metadata("design:paramtypes", [nestjs_sendgrid_1.SendGridService])
], MailService);
//# sourceMappingURL=mail.service.js.map