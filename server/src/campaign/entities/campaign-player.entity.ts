import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Campaign } from './campaign.entity';
import { Player } from '../../players/entities/player.entity';
import { Expose } from 'class-transformer';

@Entity('campaign_players')
@Unique(['campaign', 'player'])
export class CampaignPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Campaign, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => Player, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ default: false })
  played_the_game: boolean;

  @Column({ default: false })
  finished_the_game: boolean;

  @Column({ default: false })
  partook_in_the_meeting: boolean;

  @Column({ default: false })
  suggested_a_game: boolean;

  @Expose()
  get tokens(): number {
    let tokens = 1;

    if (this.played_the_game) {
      tokens += 1;
    }
    if (this.finished_the_game) {
      tokens += 1;
    }
    if (this.partook_in_the_meeting) {
      tokens += 1;
    }
    if (this.suggested_a_game) {
      tokens -= 1;
    }

    return tokens;
  }
}
