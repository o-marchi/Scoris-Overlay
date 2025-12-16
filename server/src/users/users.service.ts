import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const password: string = await bcrypt.hash(createUserDto.password, 12);

    const entity: User = this.userRepository.create({
      ...createUserDto,
      password,
    });

    const saved: User = await this.userRepository.save(entity);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _hidden, ...safe } = saved;

    return safe;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.userRepository.findOneByOrFail({ id });

    if (updateUserDto.password) {
      const password: string = await bcrypt.hash(updateUserDto.password, 12);
      Object.assign(user, { ...updateUserDto, password });
    } else {
      Object.assign(user, updateUserDto);
    }

    return this.userRepository.save(user);
  }

  buildDiscordAvatarUrl(discordId: string, avatarHash: string): string {
    const isAnimated: boolean = avatarHash.startsWith('a_');
    const extension: 'gif' | 'png' = isAnimated ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.${extension}`;
  }

  // temp
  buildGoogleAvatarUrl(googleId: string, avatarHash: string): string {
    return `https://lh3.googleusercontent.com/a-/AOh14Gg${avatarHash};`
  }
}
