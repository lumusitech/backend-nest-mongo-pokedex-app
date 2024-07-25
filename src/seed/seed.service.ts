import type { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}

  async executeSeed() {
    return 'Seed executed';
  }
}
