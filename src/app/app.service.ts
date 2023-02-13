import { Injectable } from '@nestjs/common';
import { ResponsePropio } from './../common/response';

@Injectable()
export class AppService {
  healthcheck(): ResponsePropio {
    return {
      message: 'Server On',
      status: 200,
      details: '',
      data: {},
    };
  }
}
