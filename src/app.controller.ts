import { Controller, Get, UseFilters } from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@UseFilters(BaseRpcExceptionFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('test1', Transport.KAFKA)
  test1(@Payload() message: any, @Ctx() context: KafkaContext) {
    this.appService.process(message);
    console.log('message received: ' + JSON.stringify(message))
  }

  @EventPattern('test2', Transport.KAFKA)
  test2(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('message received: ' + JSON.stringify(message))
    this.appService.process(message);
  }

  @EventPattern('test3', Transport.KAFKA)
  test3(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('message received: ' + JSON.stringify(message))
    this.appService.process(message);
  }

}
