import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('bus') private clientKafka: ClientKafka) {}

  async process(message: any) {
    return 'ok!';
  }
}
