import { forwardRef, Module } from '@nestjs/common';
import { AttendantService } from './attendant.service';
import { AttendantController } from './attendant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendant } from './entities/attendant.entity';
import { Tournament } from '../tournament/entities/tournament.entity';
import { TournamentModule } from 'src/tournament/tournament.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendant, Tournament]), forwardRef(() => TournamentModule)],
  controllers: [AttendantController],
  providers: [AttendantService],
  exports: [AttendantService],
})
export class AttendantModule {}
