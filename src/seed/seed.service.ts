import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  async executeSeed() {
    return 'Seed executed';
  }
}
