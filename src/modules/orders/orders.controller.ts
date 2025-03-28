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

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.ordersService.create(createOrderDto);
    } catch (error) {
      console.error('Error in create order endpoint:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.ordersService.findAll();
    } catch (error) {
      console.error('Error in findAll orders endpoint:', error);
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.ordersService.findOne(id);
    } catch (error) {
      console.error(`Error in findOne order endpoint for id ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }
}
