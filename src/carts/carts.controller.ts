import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserParam } from 'src/users/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartEntity } from './entities/cart.entity';

@Controller('carts')
@ApiTags('carts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('my')
  async findOne(@UserParam('id') id: number) {
    const cart = await this.cartsService.findOneByUserId(id);

    return new CartEntity(cart);
  }

  @Post('products/:productId')
  add(@Param('productId') productId: string, @UserParam('id') userId: number) {
    return this.cartsService.addProduct({
      productId: Number(productId),
      userId: Number(userId),
    });
  }

  @Delete('products/:productId')
  remove(
    @Param('productId') productId: string,
    @UserParam('id') userId: number,
  ) {
    return this.cartsService.removeProduct({
      productId: Number(productId),
      userId: Number(userId),
    });
  }

  @Delete('products')
  removeAllProducts(@UserParam('id') userId: number) {
    return this.cartsService.removeAllProducts(userId);
  }
}
