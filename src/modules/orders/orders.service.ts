import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      // Salva o pedido no banco de dados (PostgreSQL)
      const order = await this.prisma.order.create({
        data: {
          description: createOrderDto.description,
        },
      });

      // Envia o pedido para a fila RabbitMQ com o padrão correto
      await this.queueService.sendMessage('order_created', order);

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll() {
    try {
      return await this.prisma.order.findMany();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.order.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }
}
