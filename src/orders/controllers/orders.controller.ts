import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateOrderService } from '../services/create-order/create-order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { UserCredentials } from 'src/shared/decorators/user-credentials/user-credentials.decorator';
import { FindByUserService } from '../services/find-by-user/find-by-user.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrdersService: CreateOrderService,
    private readonly findByUserService: FindByUserService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async create(@Body() payload: CreateOrderDto, @Headers() headers: any) {
    const { user_id } = headers;
    return this.createOrdersService.execute({
      data: payload,
      userId: user_id,
    });
  }

  @EventPattern('list_orders_by_user')
  async findByUser(user_id: any) {
    return await this.findByUserService.execute(user_id);
  }

  @EventPattern('create_order')
  async handleCreateOrder({
    preferences,
    products,
    user_id,
  }: {
    preferences: string;
    products: any[];
    user_id: any;
  }) {
    return this.createOrdersService.execute({
      data: { preferences, products },
      userId: user_id,
    });
  }
}
