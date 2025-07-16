import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
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
