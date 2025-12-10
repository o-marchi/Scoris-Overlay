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
    const { password: _hidden, ...safe } = saved;

    return safe;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    if (updateUserDto.password) {
      const password: string = await bcrypt.hash(updateUserDto.password, 12);
      Object.assign(user, { ...updateUserDto, password });
    } else {
      Object.assign(user, updateUserDto);
    }

    return this.userRepository.save(user);
  }
}
