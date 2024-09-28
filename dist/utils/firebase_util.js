"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAdmin = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const app_1 = require("firebase-admin/app");
let app = null;
const tag = '🌰 🌰 🌰 🌰 FirebaseAdmin 🌰 🌰 ';
let FirebaseAdmin = class FirebaseAdmin {
    constructor() {
        this.firebaseConfig = {
            apiKey: 'AIzaSyCwWuUjtZgEZnxoXVsQbhqcgrEmrnmACgY',
            authDomain: 'familyarchive-01.firebaseapp.com',
            projectId: 'familyarchive-01',
            storageBucket: 'familyarchive-01.appspot.com',
            messagingSenderId: '148076980089',
            appId: '1:148076980089:web:1e3f99cc904488feab31a8',
            measurementId: 'G-J5R1G3G7RL',
        };
    }
    async onApplicationBootstrap() {
        console.log(`\n\n${tag} onApplicationBootstrap: Initializing Firebase app ... \n\n`);
        if (!app) {
            const options = {
                credential: (0, app_1.applicationDefault)(),
            };
            app = admin.initializeApp(options);
            common_1.Logger.log(`${tag} ... Firebase initialized:  🥬 options: ${JSON.stringify(app.options)} 🥬`);
        }
        else {
            common_1.Logger.debug(`${tag} ... Firebase already initialized ... ignored!`);
        }
    }
    async getUsers() {
        common_1.Logger.log(`list Firestore users collection  ... `);
        const res = await app.firestore().collection('users').get();
        const users = [];
        res.docs.forEach((m) => {
            users.push(m.data());
            common_1.Logger.log(`${tag} user : ${JSON.stringify(m.data(), null, 2)}`);
        });
        common_1.Logger.log(`${tag} getUsers: found: 🥬 ${res.docs.length} 🥬`);
        return users;
    }
    getFirebaseApp() {
        common_1.Logger.log(`${tag} getFirebaseApp: returning Firebase app: ${app.name}`);
        return app;
    }
};
exports.FirebaseAdmin = FirebaseAdmin;
exports.FirebaseAdmin = FirebaseAdmin = __decorate([
    (0, common_1.Injectable)()
], FirebaseAdmin);
//# sourceMappingURL=firebase_util.js.map