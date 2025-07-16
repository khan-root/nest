import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.aut.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createNewUser(userData);
  }

  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Delete(':id')
  deleteSingleUser(@Param('id') id: string) {
    return this.userService.deleteSingleUser(id);
  }
}
