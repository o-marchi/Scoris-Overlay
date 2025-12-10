import { forwardRef, Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignPlayer } from './entities/campaign-player.entity';
import { PlayersModule } from '../players/players.module';
import { PoolModule } from '../pool/pool.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign, CampaignPlayer]),
    forwardRef(() => PlayersModule),
    PoolModule,
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
