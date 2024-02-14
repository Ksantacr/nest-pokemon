import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  get<T>(url: string): Promise<T> {
    try {
      return fetch(url).then((res) => res.json());
      // .then((res: PokeResponse) => {
      //   return res.results;
      // });
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }
}
