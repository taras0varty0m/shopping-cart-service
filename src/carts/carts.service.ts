import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma /prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async findOneByUserId(id: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: id },
      select: {
        id: true,
        userId: true,
        items: {
          select: {
            productId: true,
            quantity: true,
            cartId: true,
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException(
        `Cart belongs to user with id ${id} not found`,
      );
    }

    return cart;
  }

  async addProduct({
    productId,
    userId,
  }: {
    productId: number;
    userId: number;
  }) {
    const [cart] = await Promise.all([
      this.findOneByUserId(userId),
      this.findProductById(productId),
    ]);

    const cartItem = await this.findCartItemByCompositeId({
      productId,
      cartId: cart.id,
    });

    if (cartItem) {
      await this.prisma.cartItem.update({
        where: {
          productId_cartId: {
            productId,
            cartId: cart.id,
          },
        },
        data: {
          quantity: cartItem.quantity + 1,
        },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
    }
  }

  private async findCartItemByCompositeId({
    productId,
    cartId,
  }: {
    productId: number;
    cartId: number;
  }) {
    return this.prisma.cartItem.findUnique({
      where: {
        productId_cartId: { productId, cartId },
      },
      select: {
        quantity: true,
      },
    });
  }

  private async findProductById(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return product;
  }

  async removeProduct({
    productId,
    userId,
  }: {
    productId: number;
    userId: number;
  }) {
    const [cart] = await Promise.all([
      this.findOneByUserId(userId),
      this.findProductById(productId),
    ]);

    const cartItem = await this.findCartItemByCompositeId({
      cartId: cart.id,
      productId,
    });

    if (!cartItem) {
      throw new NotFoundException(
        `Product with id ${productId} wasn't added to cart`,
      );
    }

    if (cartItem.quantity > 1) {
      await this.prisma.cartItem.update({
        where: {
          productId_cartId: {
            cartId: cart.id,
            productId,
          },
        },
        data: {
          quantity: cartItem.quantity - 1,
        },
      });
    } else {
      await this.prisma.cartItem.delete({
        where: {
          productId_cartId: {
            cartId: cart.id,
            productId,
          },
        },
      });
    }
  }

  async removeAllProducts(userId: number) {
    const cart = await this.findOneByUserId(userId);

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
  }
}
