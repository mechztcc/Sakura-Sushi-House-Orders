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
}
