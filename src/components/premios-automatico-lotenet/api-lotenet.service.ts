import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiLotenetService {
  constructor(private httpService: HttpService) {}

  async obtener_token(url: string, username: string, password: string) {
    const data = { username: username, password: password };

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      response.data;
      console.log(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
