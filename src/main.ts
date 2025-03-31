import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Cria a aplicação principal
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Configura a aplicação para o microserviço RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
      queue: 'orders',
      queueOptions: {
        durable: true,
      },
      // Adiciona essas opções para garantir que o consumidor seja registrado
      noAck: false,
      prefetchCount: 1,
    },
  });

  // Inicia o microserviço
  await app.startAllMicroservices();

  // Inicia a aplicação HTTP
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
