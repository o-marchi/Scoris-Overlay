import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Profile } from 'passport-discord';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/entities/player.entity';

export type AuthPlayer = Player & {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly playersService: PlayersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateDiscordUser(
    profile: Profile,
    accessToken: string,
    _refreshToken: string,
  ): Promise<AuthPlayer> {
    const dto = {
      email: (profile as any).email ?? null,
      name: (profile as any).global_name ?? profile.username,
      discord: {
        id: profile.id,
        username: profile.username,
        globalName: (profile as any).global_name ?? null,
        avatar: (profile as any).avatar
          ? this.playersService.buildDiscordAvatarUrl(
              profile.id,
              (profile as any).avatar,
            )
          : undefined,
      },
    };

    let player: Player | null = await this.playersService.findByDiscordId(
      dto.discord.id,
    );

    if (!player) {
      player = await this.playersService.create(dto);
    } else {
      player = await this.playersService.update(player.id, dto);
    }

    return {
      ...player,
      accessToken,
    };
  }

  async signToken(authPlayer: AuthPlayer): Promise<string> {
    return this.jwtService.signAsync(authPlayer);
  }
}
