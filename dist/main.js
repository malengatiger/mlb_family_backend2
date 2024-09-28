"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const my_utils_1 = require("./utils/my-utils");
const os = require("os");
const errors_interceptor_1 = require("./middleware/errors.interceptor");
const auth_middleware_1 = require("./middleware/auth.middleware");
const mm = '🔵 🔵 🔵 🔵 🔵 🔵 MLB Family Archive 🔵 🔵';
const env = process.env.NODE_ENV;
common_1.Logger.log(`${mm} NODE_ENV : ${env}`);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(new auth_middleware_1.AuthMiddleware().use);
    const port = my_utils_1.MyUtils.getPort();
    common_1.Logger.log(`${mm} ... running on port : ${port} `);
    const interfaces = os.networkInterfaces();
    let serverIP = '127.0.0.1';
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                serverIP = iface.address;
                break;
            }
        }
    }
    common_1.Logger.log(`\n${mm} ...🔆  running on: http://${serverIP}:${port}`);
    const requiredEnvVars = [
        'MAIL_HOST',
        'MAIL_USER',
        'MAIL_PASS',
        'SENDGRID_API_KEY',
        'BUCKET_NAME',
        'CLOUD_STORAGE_DIRECTORY',
    ];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            common_1.Logger.error(`${mm} Environment variable ${envVar} 😈😈😈 is missing!`);
        }
        else {
            common_1.Logger.log(`${mm} Environment variable ${envVar} is present. 🥬🥬🥬 ${process.env[envVar]}`);
        }
    }
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('FamilyArchive Backend')
        .setDescription('The Family Archive API manages the backend data ')
        .setVersion('1.0')
        .addTag('family')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    common_1.Logger.log(`${mm} ... Swagger set up .....`);
    app.enableCors();
    common_1.Logger.log(`${mm} ... CORS set up .....`);
    app.useGlobalInterceptors(new errors_interceptor_1.ErrorsInterceptor());
    common_1.Logger.log(`${mm} ... ErrorsInterceptor set up .....`);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map