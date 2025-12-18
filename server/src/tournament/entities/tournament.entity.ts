import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Attendant } from '../../attendant/entities/attendant.entity';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: 'SINGLES' | 'TEAMS';

  @ManyToOne((): typeof User => User, (user) => user.tournaments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToMany(() => Attendant)
  @JoinTable({
    name: 'tournament_attendants',
    joinColumn: { name: 'tournament_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attendant_id', referencedColumnName: 'id' },
  })
  attendants: Attendant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}