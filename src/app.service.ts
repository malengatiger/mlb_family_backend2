import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `🥬🥬🥬🥬🥬🥬 FamilyArchive Backend API:  🍎 ${new Date().toISOString()} 🍎`;
  }
}
