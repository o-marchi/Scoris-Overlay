import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CampaignPlayer } from '../../campaign/entities/campaign-player.entity';

export class DiscordProfile {
  @Column({ name: 'discordId', nullable: true })
  id?: string;

  @Column({ name: 'username', nullable: true })
  username?: string;

  @Column({ name: 'global_name', nullable: true })
  globalName?: string;

  @Column({ name: 'avatar', nullable: true })
  avatar?: string;
}

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  name?: string;

  @Column(() => DiscordProfile, { prefix: false })
  discord?: DiscordProfile;

  @OneToMany(
    () => CampaignPlayer,
    (campaignPlayer: CampaignPlayer) => campaignPlayer.player,
    { cascade: true },
  )
  campaigns: CampaignPlayer[];
}
