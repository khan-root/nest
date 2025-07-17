import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user-schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    const user: UserDocument = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }
}
