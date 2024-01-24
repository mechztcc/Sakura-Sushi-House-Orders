import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqps://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}/${process.env.RABBITMQ_DEFAULT_USER}`
        ],
        queue: 'orders_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.listen();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}
bootstrap();
