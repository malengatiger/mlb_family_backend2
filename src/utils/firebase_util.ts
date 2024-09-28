import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import { User } from 'src/user/user.service';

let app: admin.app.App = null;
const tag = '🌰 🌰 🌰 🌰 FirebaseAdmin 🌰 🌰 ';
/*
gcloud projects add-iam-policy-binding familyarchive-01 \
  --member="serviceAccount:archivebackend-service-account@familyarchive-01.iam.gserviceaccount.com" \
  --role="roles/serviceusage.serviceUsageConsumer"

  gcloud projects add-iam-policy-binding familyarchive-01 \
  --member="serviceAccount:archivebackend-service-account@familyarchive-01.iam.gserviceaccount.com" \
  --role="roles/firebase.admin"

  gcloud projects add-iam-policy-binding familyarchive-01 \
  --member="serviceAccount:archivebackend-service-account@familyarchive-01.iam.gserviceaccount.com" \
  --role="roles/datastore.owner"

*/
@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  firebaseConfig = {
    apiKey: 'AIzaSyCwWuUjtZgEZnxoXVsQbhqcgrEmrnmACgY',
    authDomain: 'familyarchive-01.firebaseapp.com',
    projectId: 'familyarchive-01',
    storageBucket: 'familyarchive-01.appspot.com',
    messagingSenderId: '148076980089',
    appId: '1:148076980089:web:1e3f99cc904488feab31a8',
    measurementId: 'G-J5R1G3G7RL',
  };

  // Initialize Firebase
  async onApplicationBootstrap() {
    console.log(
      `\n\n${tag} onApplicationBootstrap: Initializing Firebase app ... \n\n`,
    );
    if (!app) {
      const options: admin.AppOptions = {
        credential: applicationDefault(),
      };

      app = admin.initializeApp(options);
      Logger.log(
        `${tag} ... Firebase initialized:  🥬 options: ${JSON.stringify(app.options)} 🥬`,
      );
    } else {
      Logger.debug(`${tag} ... Firebase already initialized ... ignored!`);
    }
  }

  public async getUsers(): Promise<User[]> {
    Logger.log(`list Firestore users collection  ... `);
    const res = await app.firestore().collection('users').get();
    const users: User[] = [];
    res.docs.forEach((m) => {
      users.push(m.data() as User);
      Logger.log(`${tag} user : ${JSON.stringify(m.data(), null, 2)}`);
    });

    Logger.log(`${tag} getUsers: found: 🥬 ${res.docs.length} 🥬`);
    return users;
  }

  public getFirebaseApp() {
    Logger.log(`${tag} getFirebaseApp: returning Firebase app: ${app.name}`);
    return app;
  }
}
