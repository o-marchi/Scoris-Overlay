import { Injectable } from '@nestjs/common';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pool } from './entities/pool.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PoolOption } from './entities/pool-option.entity';
import { Game } from '../games/entities/game.entity';

@Injectable()
export class PoolService {
  constructor(
    @InjectRepository(Pool)
    private poolRepository: Repository<Pool>,
    @InjectRepository(PoolOption)
    private poolOptionRepository: Repository<PoolOption>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    // @InjectRepository(Player)
    // private playerRepository: Repository<Player>,
  ) {}

  async create(createPoolDto: CreatePoolDto): Promise<Pool> {
    const pool: Pool = this.poolRepository.create();

    pool.options = await Promise.all(
      createPoolDto.options.map(async (optionDto) => {
        const option = new PoolOption();

        option.game = await this.gameRepository.findOneByOrFail({
          id: optionDto.gameId,
        });
        option.players = [];

        return option;
      }),
    );

    return this.poolRepository.save(pool);
  }

  findAll(): Promise<Pool[]> {
    return this.poolRepository.find({
      relations: ['options', 'options.game', 'options.players'],
    });
  }

  findOne(id: number): Promise<Pool | null> {
    return this.poolRepository.findOne({
      where: { id },
      relations: ['options', 'options.game', 'options.players'],
    });
  }

  async update(id: number, updatePoolDto: UpdatePoolDto): Promise<Pool> {
    // const entity: Pool | undefined = await this.poolRepository.preload({
    //   id,
    //   ...updatePoolDto,
    // });
    //
    // if (!entity) {
    //   throw new Error('Pool not found');
    // }
    //
    // await this.poolRepository.save(entity);

    return this.poolRepository.findOneOrFail({
      where: { id },
      relations: ['game', 'players', 'players.player'],
    });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.poolRepository.delete(id);
  }
}
