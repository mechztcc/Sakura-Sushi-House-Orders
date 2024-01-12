import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';

interface IRequest {
  data: CreateOrderDto;
  userId: string;
}
@Injectable()
export class CreateOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ data, userId }: IRequest) {
    return this.prisma.order.create({
      data: {
        userId,
        preferences: data.preferences,
        products: { createMany: { data: [...data.products] } },
      },
    });
  }
}
