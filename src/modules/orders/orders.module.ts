import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { LogsModule } from '../logs/logs.module'; // Importa o LogsModule

@Module({
  imports: [PrismaModule, LogsModule], // Adiciona o LogsModule aqui
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
