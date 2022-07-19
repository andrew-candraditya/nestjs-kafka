import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'bus',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env['KAFKA_BROKER']],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username: process.env['KAFKA_USERNAME'],
              password: process.env['KAFKA_PASSWORD'],
            },
          },
          run: { autoCommit: false },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
