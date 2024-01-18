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
            `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`,
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
            `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`,
          ],
          queue: 'orders_queue',
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_ORDERS',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`,
          ],
          queue: 'create_orders_queue',
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
