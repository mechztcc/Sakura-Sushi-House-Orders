import {
  Body,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateOrderService } from '../services/create-order/create-order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { EventPattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly createOrdersService: CreateOrderService) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async create(@Body() payload: CreateOrderDto, @Headers() headers: any) {
    const { user_id } = headers;
    return this.createOrdersService.execute({
      data: payload,
      userId: user_id,
    });
  }

  @EventPattern('create_order')
  async handleCreateOrder({ preferences, products, user_id }: { preferences: string; products: any[]; user_id: any }) {
    return this.createOrdersService.execute({
      data: { preferences, products },
      userId: user_id,
    });
  }
}
