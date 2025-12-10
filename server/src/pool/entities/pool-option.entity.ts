import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Pool } from './pool.entity';
import { Game } from '../../games/entities/game.entity';

@Entity('pool_options')
export class PoolOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pool, (pool) => pool.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pool_id' })
  pool: Pool;

  @ManyToOne(() => Game, { nullable: false })
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToMany(() => Player)
  @JoinTable({
    name: 'pool_option_players',
    joinColumn: { name: 'pool_option_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'player_id', referencedColumnName: 'id' },
  })
  players: Player[];
}
