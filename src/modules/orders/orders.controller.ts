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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly logsService: LogsService,
  ) {}

  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
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

  @ApiOperation({ summary: 'Buscar um pedido pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do pedido',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
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
      console.error(`Error fetching order with id ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }

  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }
}
