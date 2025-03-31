import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QueueService {
  constructor(@Inject('ORDER_QUEUE') private readonly client: ClientProxy) {}

  async sendMessage(pattern: string, data: any) {
    // Usar emit() com toPromise() para evento (EventPattern)
    await this.client.emit(pattern, data).toPromise();
    return { success: true };
  }
}
