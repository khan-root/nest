import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user-schema';
import { Model } from 'mongoose';
import { UserTypes } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
  ) {}

  async createNewUser(user: UserTypes): Promise<User> {
    const userExists = await this.UserModel.findOne({
      userName: user.userName,
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const created = new this.UserModel(user);
    return created.save();
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.UserModel.find();
    return users;
  }

  async deleteSingleUser(id: string): Promise<{ message: string }> {
    const user = await this.UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User deleted successfully',
    };
  }
}
