"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const firebase_util_1 = require("./utils/firebase_util");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const mail_module_1 = require("./mail/mail.module");
const mail_controller_1 = require("./mail/mail.controller");
const mail_service_1 = require("./mail/mail.service");
const core_1 = require("@nestjs/core");
const errors_interceptor_1 = require("./middleware/errors.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_sendgrid_1.SendGridModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    apiKey: configService.get('SENDGRID_API_KEY'),
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            mail_module_1.MailModule,
        ],
        controllers: [app_controller_1.AppController, mail_controller_1.MailController],
        providers: [
            app_service_1.AppService,
            firebase_util_1.FirebaseAdmin,
            mail_service_1.MailService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: errors_interceptor_1.ErrorsInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map