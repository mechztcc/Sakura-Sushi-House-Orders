import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { CreateOrderService } from './services/create-order/create-order.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FindByUserService } from './services/find-by-user/find-by-user.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [CreateOrderService, FindByUserService],
})
export class OrdersModule {}
