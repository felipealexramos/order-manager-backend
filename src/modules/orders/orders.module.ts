import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { LogsModule } from '../logs/logs.module'; // Importa o LogsModule
import { QueueModule } from '../queue/queue.module'; // Importa o QueueModule

@Module({
  imports: [PrismaModule, LogsModule, QueueModule], // Adiciona o QueueModule aqui
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
