import { Module, OnModuleInit } from '@nestjs/common';
import { ProduceLogsService } from './producer-logs/producer-logs.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerOrdersService } from './producer-orders/producer-orders.service';

@Module({
  providers: [ProduceLogsService, ProducerOrdersService],
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqps://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}/${process.env.RABBITMQ_DEFAULT_USER}`,
          ],
          queue: 'logs_queue',
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_ORDERS',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqps://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}/${process.env.RABBITMQ_DEFAULT_USER}`,
          ],
          queue: 'orders_queue',
        },
      },
    ]),
  ],
})
export class RabbitmqModule implements OnModuleInit {
  constructor(private readonly producer: ProducerOrdersService) {}
  onModuleInit() {
    this.producer.connect();
  }
}
