import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Descrição do pedido',
    example: 'Pedido de notebook Dell XPS 13',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
