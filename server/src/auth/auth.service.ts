import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Profile } from 'passport-discord';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

export type AuthUser = Omit<User, 'password'> & {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateDiscordUser(profile: Profile, accessToken: string, _refreshToken: string): Promise<AuthUser> {
    const dto: CreateUserDto = {
      provider: 'Discord',
      email: profile.email || '',
      name: profile.username,
      password: '',
    };

    return this.validateUser(dto, accessToken);
  }

  async validateUser(dto: CreateUserDto, accessToken: string): Promise<AuthUser> {
    try {
      // Get user
      const user: User = await this.usersService.findOneByEmail(dto.email);

      await this.usersService.update(user.id, dto);

      return {
        ...user,
        accessToken,
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      // create new user
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
}
