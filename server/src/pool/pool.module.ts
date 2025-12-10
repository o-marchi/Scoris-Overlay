import { Module } from '@nestjs/common';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './entities/pool.entity';
import { PoolOption } from './entities/pool-option.entity';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pool, PoolOption]), GamesModule],
  controllers: [PoolController],
  providers: [PoolService],
  exports: [TypeOrmModule],
})
export class PoolModule {}
