import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.tdo';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todos-schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/schemas/user-schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private readonly TodoModel: Model<TodoDocument>,
  ) {}

  async createTodo(
    createTodoDto: CreateTodoDto,
    user: UserDocument,
  ): Promise<{ message: string; todo: Todo }> {
    const newTodo = new this.TodoModel({
      ...createTodoDto,
      owner: user._id,
    });
    await newTodo.save();
    return { message: 'Todo created successfully', todo: newTodo as Todo };
  }

  async getAllTodos(): Promise<{ message: string; todos: Todo[] }> {
    const todos = await this.TodoModel.find();
    return { message: 'Todos fetched successfully', todos };
  }
}
