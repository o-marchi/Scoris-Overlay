import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const entity: Player = this.playerRepository.create(createPlayerDto);
    return this.playerRepository.save(entity);
  }

  findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  findOne(id: number): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  findOneOrFail(id: number): Promise<Player> {
    return this.playerRepository.findOneByOrFail({ id });
  }

  findByEmail(email: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ email });
  }

  findByDiscordId(discordId: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ discord: { id: discordId } });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const entity: Player | undefined = await this.playerRepository.preload({
      id,
      ...updatePlayerDto,
    });

    if (!entity) {
      throw new Error('Player not found');
    }

    return this.playerRepository.save(entity);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.playerRepository.delete(id);
  }

  buildDiscordAvatarUrl(discordId: string, avatarHash: string): string {
    const isAnimated: boolean = avatarHash.startsWith('a_');
    const extension: 'gif' | 'png' = isAnimated ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.${extension}`;
  }
}
