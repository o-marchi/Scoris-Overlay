import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Player } from '../../players/entities/player.entity';

export const CurrentPlayer = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Player | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || null;
  },
);
