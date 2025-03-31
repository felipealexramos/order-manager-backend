import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { LogsModule } from '../logs/logs.module'; // Importe o LogsModule

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
          queue: 'orders',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    LogsModule, // Adicione o LogsModule aqui
  ],
  providers: [QueueService, QueueProcessor],
  exports: [QueueService],
})
export class QueueModule {}
