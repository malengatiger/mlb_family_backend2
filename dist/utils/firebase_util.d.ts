import { OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from 'src/user/user.service';
export declare class FirebaseAdmin implements OnApplicationBootstrap {
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
    onApplicationBootstrap(): Promise<void>;
    getUsers(): Promise<User[]>;
    getFirebaseApp(): admin.app.App;
}
