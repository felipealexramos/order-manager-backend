import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { LogsService } from '../logs/logs.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly logsService: LogsService, // Injeta o LogsService
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.ordersService.create(createOrderDto);
      await this.logsService.createLog(
        order.id,
        'CREATED',
        'Order created successfully',
      );
      return order;
    } catch (error) {
      console.error('Error in create order endpoint:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const order = await this.ordersService.findOne(id);
      await this.logsService.createLog(
        id,
        'FETCHED',
        'Order fetched successfully',
      );
      return order;
    } catch (error) {
      console.error(`Error in findOne order endpoint for id ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }

  @Get()
  async findAll() {
    try {
      const orders = await this.ordersService.findAll();
      await this.logsService.createLog(
        'ALL_ORDERS',
        'FETCHED_ALL',
        'All orders fetched successfully',
      );
      return orders;
    } catch (error) {
      console.error('Error in findAll orders endpoint:', error);
      throw new InternalServerErrorException('Failed to fetch all orders');
    }
  }
}
