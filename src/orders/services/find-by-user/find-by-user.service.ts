import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';

@Injectable()
export class FindByUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId: id },
      include: { products: true },
    });
    return orders;
  }
}
