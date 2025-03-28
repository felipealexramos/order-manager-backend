import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('orders')
export class OrdersProcessor {
  @Process('processOrder')
  async handleOrder(job: Job) {
    console.log(`Processing order ${job.data.id}`);
    // Processamento do pedido
  }
}