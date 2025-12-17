import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Tournament } from './entities/tournament.entity';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTournamentDto: CreateTournamentDto, @CurrentUser() user: User): Promise<Tournament> {
    return this.tournamentService.create(createTournamentDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@CurrentUser() user: User): Promise<Tournament[]> {
    return this.tournamentService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentService.update(+id, updateTournamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentService.remove(+id);
  }
}
