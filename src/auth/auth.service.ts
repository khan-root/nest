import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from 'src/users/schemas/user-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
  ) {}
  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; newUser: User }> {
    const { email, password, userName } = registerDto;
    const findUser = await this.UserModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.UserModel({
      ...registerDto,
      password: hashedPassword,
    });
    await newUser.save();
    return {
      message: 'User created successfully',
      newUser,
    };
  }

  async validateUser(loginDto: LoginDto): Promise<UserDocument> {
    const { email, password } = loginDto;

    const findUser = await this.UserModel.findOne({
      email,
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return findUser;
  }
}
