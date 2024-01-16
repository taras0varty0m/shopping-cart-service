import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma /prisma.service';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products.map((product) => new ProductEntity(product));
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return new ProductEntity(product);
  }
}
