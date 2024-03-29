import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserParam } from './user.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new UserEntity(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async me(@UserParam('id') id: number) {
    const user = await this.usersService.findOne(id);
    return new UserEntity(user);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @UserParam('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return new UserEntity(user);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@UserParam('id') id: number) {
    const user = await this.usersService.delete(id);
    return new UserEntity(user);
  }
}
