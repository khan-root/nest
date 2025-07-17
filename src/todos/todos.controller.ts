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
import { JwtAuthGuard } from 'src/auth/jwt.aut.guard';
import { CreateTodoDto } from './dtos/create-todo.tdo';
import { TodosService } from './todos.service';
import { getUser } from 'src/common/decotrators/get-user.decorator';
import { UserDocument } from 'src/users/schemas/user-schema';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @getUser() user: UserDocument,
  ) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Get('get-all')
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get('get-by-user/:id')
  getTodoByUser(@Param('id') id: string) {
    return this.todoService.getTodoByUser(id);
  }

  @Delete('delete/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
