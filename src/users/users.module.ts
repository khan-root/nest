import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersMiddleware } from './users.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .exclude({
        path: 'users/create',
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: 'users',
        method: RequestMethod.ALL,
      });
  }
}
