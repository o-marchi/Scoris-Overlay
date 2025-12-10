import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PoolOption } from './pool-option.entity';

@Entity('pools')
export class Pool {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PoolOption, (option) => option.pool, {
    cascade: true,
    eager: true,
  })
  options: PoolOption[];
}
