"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const mm = '🔑🔑🔑🔑🔑 AuthMiddleware 🔐 ';
const errorMessage = '🔴 🔴 🔴 Request is Unauthorized';
let AuthMiddleware = class AuthMiddleware {
    async use(req, res, next) {
        const authToken = req.headers.authorization;
        common_1.Logger.log(`${mm} request headers: ${JSON.stringify(req.headers, null, 2)} `);
        common_1.Logger.debug(`${mm} request originalUrl: ${JSON.stringify(req.originalUrl, null, 2)} `);
        if (process.env.NODE_ENV == 'development') {
            common_1.Logger.debug(`${mm} 🔴 letting you into the club without a ticket! 🔵 🔵 🔵 `);
            next();
            return;
        }
        else {
            common_1.Logger.debug(`${mm} 🔴 🔴 🔴 🔴 We are the TSA and we gonna look up your ass!! 🔴 🔴 🔴`);
        }
        if (!authToken) {
            common_1.Logger.error(`${mm} authentication token not found in request header 🔴`);
            return res.status(401).json({
                message: errorMessage,
                statusCode: 401,
                date: new Date().toISOString(),
            });
        }
        try {
            const token = authToken.substring(7);
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        }
        catch (error) {
            const msg = `${mm} 😈😈😈 Error verifying authentication token 😈😈😈: 🔴 ${error} 🔴`;
            common_1.Logger.error(msg);
            return res.status(403).json({
                message: msg,
                statusCode: 403,
                date: new Date().toISOString(),
            });
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map