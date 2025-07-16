import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersMiddleware } from './users.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user-schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .exclude({
        path: 'users/create',
        method: RequestMethod.POST,
      })
      .forRoutes(UsersController);
  }
}
