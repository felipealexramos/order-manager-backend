import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OrdersModule } from './modules/orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './modules/logs/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    PrismaModule, // Configuração do PostgreSQL
    OrdersModule,
    LogsModule, // Módulo para gerenciar logs no MongoDB
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/default-db',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
