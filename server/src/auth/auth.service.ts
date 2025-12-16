import { Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Profile as DiscordProfile } from 'passport-discord';
import type { Profile as GoogleProfile } from 'passport-google-oauth20';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import express from 'express';
import { ConfigService } from '@nestjs/config';

export type AuthUser = Omit<User, 'password'> & {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateDiscordUser(profile: DiscordProfile, accessToken: string, _refreshToken: string): Promise<AuthUser> {
    const dto: CreateUserDto = {
      provider: 'Discord',
      email: profile.email || '',
      name: profile.username,
      password: '',
      avatar: profile.avatar ? this.usersService.buildDiscordAvatarUrl(profile.id, profile.avatar) : undefined,
      discord: {
        id: profile.id,
        username: profile.username,
        globalName: profile.global_name || undefined,
      },
    };

    return this.validateUser(dto, accessToken);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateGoogleUser(profile: GoogleProfile, accessToken: string, _refreshToken: string): Promise<AuthUser> {
    const dto: CreateUserDto = {
      provider: 'Google',
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
      name: profile.displayName,
      password: '',
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
      google: {
        id: profile.id,
        displayName: profile.displayName,
      },
    };

    return this.validateUser(dto, accessToken);
  }

  private prepareUpdateDto(user: User, dto: CreateUserDto): CreateUserDto {
    return {
      ...dto,
      name: user.name || dto.name,
      avatar: user.avatar || dto.avatar,
      password: user.password || '',
    };
  }

  async validateUser(dto: CreateUserDto, accessToken: string): Promise<AuthUser> {
    try {
      /**
       * Get User
       */
      const user: User = await this.usersService.findOneByEmail(dto.email);
      const updatedDto: CreateUserDto = this.prepareUpdateDto(user, dto);

      await this.usersService.update(user.id, updatedDto);

      return {
        ...user,
        accessToken,
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      /**
       * Create a new user
       */
      const newUser: Omit<User, 'password'> = await this.usersService.create(dto);

      return {
        ...newUser,
        accessToken,
      };
    }
  }

  async signToken(authUser: AuthUser): Promise<string> {
    return this.jwtService.signAsync(authUser);
  }

  async handleCallback(@Req() req: express.Request, @Res() res: express.Response) {
    const authUser = req.user as AuthUser;
    const clientUrl: string = this.config.getOrThrow<string>('PUBLIC_CLIENT_URL');

    console.log(authUser);

    if (!authUser) {
      return res.redirect(302, `${clientUrl}?authentication_error=true`);
    }

    const token: string = await this.signToken(authUser);
    const redirectUrl = new URL('/auth/callback', clientUrl);
    redirectUrl.searchParams.append('jwt', token);
    redirectUrl.searchParams.append('access_token', authUser.accessToken);

    return res.redirect(302, redirectUrl.toString());
  }
}
