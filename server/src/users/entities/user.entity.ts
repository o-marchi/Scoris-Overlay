import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class DiscordProfile {
  @Column({ nullable: true })
  id?: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  globalName?: string;
}

export class GoogleProfile {
  @Column({ nullable: true })
  id?: string;

  @Column({ nullable: true })
  displayName?: string;
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  provider?: 'Discord' | 'Google';

  @Column({ select: false })
  password: string;

  // Path to the avatar image
  @Column({ nullable: true })
  avatar?: string;

  // Discord information
  @Column((): typeof DiscordProfile => DiscordProfile, { prefix: true })
  discord?: DiscordProfile;

  // Discord information
  @Column((): typeof GoogleProfile => GoogleProfile, { prefix: true })
  google?: GoogleProfile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
