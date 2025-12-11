import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

export const CurrentPlayer = createParamDecorator((_data: unknown, ctx: ExecutionContext): User | null => {
  const request = ctx.switchToHttp().getRequest();
  return request.user || null;
});
