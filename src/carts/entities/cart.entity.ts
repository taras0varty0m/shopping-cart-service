import { ApiProperty } from '@nestjs/swagger';
import { Cart, CartItem } from '@prisma/client';
import { ProductEntity } from 'src/products/entities/product.entity';

export class CartEntity implements Cart {
  constructor(partial: Partial<CartEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  items: CartItemEntity[];
}

class CartItemEntity implements CartItem {
  constructor(partial: Partial<CartItemEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  product: ProductEntity;

  @ApiProperty()
  cartId: number;
}
