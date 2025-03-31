/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { Channel, Message } from 'amqplib'; // Importa os tipos do amqplib

@Controller()
export class QueueProcessor {
  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel: Channel = context.getChannelRef(); // Obtém o canal do RabbitMQ
    const originalMessage = context.getMessage() as Message; // Faz o cast explícito para o tipo Message

    try {
      console.log('Mensagem recebida da fila:', data);

      // Processa a mensagem
      await this.processOrder(data);

      console.log('Mensagem processada com sucesso!');

      // Confirma a mensagem manualmente
      channel.ack(originalMessage);
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);

      // Opcional: Nack para reentregar a mensagem
      channel.nack(originalMessage);
    }
  }

  private async processOrder(data: any) {
    console.log('Iniciando o processamento do pedido:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um processamento
    console.log('Processamento do pedido concluído:', data);
  }
}