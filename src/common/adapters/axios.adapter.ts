import { Injectable } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import type { HttpAdapter } from '../interfaces/http.adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error - check server logs');
    }
  }
}
