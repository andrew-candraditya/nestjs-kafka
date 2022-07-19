import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env['KAFKA_BROKER']],
        ssl: true,
        logLevel: 4,
        sasl: {
          mechanism: 'plain',
          username: process.env['KAFKA_USERNAME'],
          password: process.env['KAFKA_PASSWORD'],
        },
      },
      run: { autoCommit: false },
      producer: { allowAutoTopicCreation: false },
      consumer: {
        groupId: 'test',
        allowAutoTopicCreation: true,
        readUncommitted: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env['PORT'], process.env['HOST']);
}
bootstrap();
