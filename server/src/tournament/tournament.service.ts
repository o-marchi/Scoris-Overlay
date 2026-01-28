import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto, user: User): Promise<Tournament> {
    const { attendants, ...data } = createTournamentDto;

    const entity = this.tournamentRepository.create({
      ...data,
      user: user,
    });

    return this.tournamentRepository.save(entity);
  }

  findAll(user: User): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: { user: { id: user.id } },
    });
  }

  findOne(id: number) {
    return this.tournamentRepository.findOneBy({ id });
    // return `This action returns a #${id} tournament`;
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a #${id} tournament`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
