import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.tdo';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todos-schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user-schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private readonly TodoModel: Model<TodoDocument>,
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
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

  async getTodoByUser(
    id: string,
  ): Promise<{ message: string; todos: Todo[] } | null> {
    const findUser = await this.UserModel.findById(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const todos = await this.TodoModel.find({ owner: id });
    if (!todos) {
      throw new NotFoundException('Todos not found');
    }
    return { message: 'Todos fetched successfully', todos };
  }

  async deleteTodo(id: string): Promise<{ message: string }> {
    const deleteTodo = await this.TodoModel.findByIdAndDelete(id);
    if (!deleteTodo) {
      throw new NotFoundException('Todo not found');
    }
    return { message: 'Todo deleted successfully' };
  }
}
