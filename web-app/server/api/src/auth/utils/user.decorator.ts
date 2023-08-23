import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from 'src/user/interface/user.interface';

export const User = createParamDecorator(
  (data: any, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
