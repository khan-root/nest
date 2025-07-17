import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/users/schemas/user-schema';
import { Request } from 'express';

export const getUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as UserDocument;
  },
);
