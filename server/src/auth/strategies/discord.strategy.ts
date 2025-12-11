import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { ConfigService } from '@nestjs/config';
import { AuthUser, AuthService } from '../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.getOrThrow<string>('DISCORD_CLIENT_ID'),
      clientSecret: config.getOrThrow<string>('DISCORD_CLIENT_SECRET'),
      callbackURL: config.getOrThrow<string>('DISCORD_CALLBACK_URL'),
      scope: ['identify', 'email'],
      passReqToCallback: false,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<AuthUser> {
    return this.authService.validateDiscordUser(profile, accessToken, refreshToken);
  }
}
