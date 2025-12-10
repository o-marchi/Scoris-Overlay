import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CampaignModule } from './campaign/campaign.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { PoolModule } from './pool/pool.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      migrations: ['db/migrations/*{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),

    UsersModule,
    CampaignModule,
    PlayersModule,
    GamesModule,
    AuthModule,
    PoolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
