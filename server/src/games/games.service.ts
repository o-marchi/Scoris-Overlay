import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  create(createGameDto: CreateGameDto): Promise<Game> {
    const entity: Game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(entity);
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  findOne(id: number): Promise<Game | null> {
    return this.gameRepository.findOneBy({ id });
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const entity: Game | undefined = await this.gameRepository.preload({
      id,
      ...updateGameDto,
    });

    if (!entity) {
      throw new Error('Game not found');
    }

    return this.gameRepository.save(entity);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.gameRepository.delete(id);
  }
}
