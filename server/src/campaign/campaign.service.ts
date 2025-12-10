import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PlayersService } from '../players/players.service';
import { CampaignPlayer } from './entities/campaign-player.entity';
import { Player } from '../players/entities/player.entity';
import { UpdateGameInformationDto } from './dto/update-game-information.dto';
import { PoolOption } from '../pool/entities/pool-option.entity';

const sortCampaigns = (campaigns: Campaign[]): Campaign[] => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return campaigns.sort((a, b) => {
    // sort by year
    if (a.year !== b.year) {
      return +a.year - +b.year;
    }

    // sort by month
    const indexA = months.findIndex((month) => month === a.month);
    const indexB = months.findIndex((month) => month === b.month);

    return indexA - indexB;
  });
};

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignPlayer)
    private campaignPlayerRepository: Repository<CampaignPlayer>,
    @InjectRepository(PoolOption)
    private poolOptionRepository: Repository<PoolOption>,
    private playersService: PlayersService,
  ) {}

  private defaultRelations: string[] = [
    'game',
    'players',
    'players.player',
    'pool',
    'pool.options',
    'pool.options.game',
    'pool.options.players',
  ];

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const entity: Campaign = this.campaignRepository.create(createCampaignDto);
    return this.campaignRepository.save(entity);
  }

  findAll(): Promise<Campaign[]> {
    return this.campaignRepository.find({ relations: this.defaultRelations });
  }

  async findAllHistory(): Promise<Campaign[]> {
    const campaigns = await this.campaignRepository.find({
      relations: ['game'],
    });

    return sortCampaigns(campaigns);
  }

  findOne(id: number): Promise<Campaign | null> {
    return this.campaignRepository.findOneBy({ id });
  }

  findOneOrFail(id: number): Promise<Campaign | null> {
    return this.campaignRepository.findOneByOrFail({ id });
  }

  async update(
    id: number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const payload: any = { id, ...updateCampaignDto };

    if (Object.prototype.hasOwnProperty.call(updateCampaignDto, 'gameId')) {
      payload.game = updateCampaignDto.gameId
        ? { id: updateCampaignDto.gameId }
        : null;
    }

    if (Object.prototype.hasOwnProperty.call(updateCampaignDto, 'poolId')) {
      payload.pool = updateCampaignDto.poolId
        ? { id: updateCampaignDto.poolId }
        : null;
    }

    const entity: Campaign | undefined =
      await this.campaignRepository.preload(payload);

    if (!entity) {
      throw new Error('Campaign not found');
    }

    await this.campaignRepository.save(entity);

    return this.campaignRepository.findOneOrFail({
      where: { id },
      relations: this.defaultRelations,
    });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.campaignRepository.delete(id);
  }

  async addPlayer(campaign: Campaign, player: Player): Promise<boolean> {
    if (campaign.players.some((cp) => cp.player.id === player.id)) {
      return false;
    }

    const campaignPlayer: CampaignPlayer = this.campaignPlayerRepository.create(
      {
        campaign,
        player,
        played_the_game: false,
        finished_the_game: false,
        partook_in_the_meeting: false,
        suggested_a_game: false,
      },
    );

    await this.campaignPlayerRepository.save(campaignPlayer);

    return true;
  }

  async current(player: Player | null = null): Promise<Campaign> {
    const currentCampaign: Campaign =
      await this.campaignRepository.findOneOrFail({
        where: { current: true },
        relations: this.defaultRelations,
      });

    if (!player) {
      return currentCampaign;
    }

    const wasPlayerAdded = await this.addPlayer(currentCampaign, player);

    if (wasPlayerAdded) {
      return this.campaignRepository.findOneOrFail({
        where: { current: true },
        relations: this.defaultRelations,
      });
    }

    return currentCampaign;
  }

  getPlayerCampaign(campaign: Campaign, player: Player): CampaignPlayer | null {
    return campaign.players.find((cp) => cp.player.id === player.id) ?? null;
  }

  async updatePlayerGameInformation(
    player: Player,
    updateGameInformation: UpdateGameInformationDto,
  ): Promise<CampaignPlayer> {
    const currentCampaign: Campaign | null = await this.current();
    const campaignPlayer: CampaignPlayer | null = this.getPlayerCampaign(
      currentCampaign,
      player,
    );

    if (!campaignPlayer) {
      throw new Error('Player not in campaign');
    }

    campaignPlayer.played_the_game = updateGameInformation.played_the_game;
    campaignPlayer.finished_the_game = updateGameInformation.finished_the_game;

    return this.campaignPlayerRepository.save(campaignPlayer);
  }

  async undoVote(player: Player): Promise<Campaign> {
    const currentCampaign: Campaign | null = await this.current();

    if (!currentCampaign) {
      throw new Error('No campaign found');
    }

    const pool = currentCampaign.pool;

    if (!pool) {
      throw new Error('No pool found');
    }

    for (const option of pool.options) {
      option.players = option.players.filter((p) => p.id !== player.id);

      await this.poolOptionRepository.save(option);
    }

    return this.current();
  }

  async vote(player: Player, optionId: number): Promise<Campaign> {
    const currentCampaign: Campaign | null = await this.current();

    if (!currentCampaign) {
      throw new Error('No campaign found');
    }

    const pool = currentCampaign.pool;

    if (!pool) {
      throw new Error('No pool found');
    }

    for (const option of pool.options) {
      option.players = option.players.filter((p) => p.id !== player.id);

      await this.poolOptionRepository.save(option);
    }

    currentCampaign.pool?.options.forEach((option) => {
      if (option.id === optionId) {
        const alreadyVoted = option.players.some((p) => p.id === player.id);

        if (!alreadyVoted) {
          option.players.push(player);
        }
      } else {
        option.players = option.players.filter((p) => p.id !== player.id);
      }
    });

    const selectedOption = await this.poolOptionRepository.findOneOrFail({
      where: { id: optionId },
      relations: ['players'],
    });

    selectedOption.players.push(player);

    await this.poolOptionRepository.save(selectedOption);

    return this.current();
  }

  async recalculateElectionResult(): Promise<
    { optionId: number; game: string; tokens: number }[]
  > {
    const currentCampaign: Campaign | null = await this.current();

    if (!currentCampaign) {
      throw new Error('No campaign found');
    }

    const pool = currentCampaign.pool;

    if (!pool) {
      throw new Error('No pool found');
    }

    const electionResult: { optionId: number; game: string; tokens: number }[] =
      [];

    for (const option of pool.options) {
      const players = option.players;

      const tokens = players.reduce((tokens, player) => {
        const campaignPlayer = currentCampaign.players.find(
          (campaignPlayer) => campaignPlayer.player.id === player.id,
        );

        if (!campaignPlayer) {
          return tokens;
        }

        return campaignPlayer.tokens + tokens;
      }, 0);

      electionResult.push({
        optionId: option.id,
        game: option?.game.title,
        tokens,
      });
    }

    return electionResult;
  }
}
