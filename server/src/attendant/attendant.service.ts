import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { UpdateAttendantDto } from './dto/update-attendant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendant } from './entities/attendant.entity';
import { Tournament } from '../tournament/entities/tournament.entity';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AttendantService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,

    @InjectRepository(Attendant)
    private attendantRepository: Repository<Attendant>,
  ) {}

  async create(createAttendantDto: CreateAttendantDto): Promise<Attendant> {
    const tournament:Tournament = await this.tournamentRepository.findOneOrFail({ where: { id: 2 }, relations: ['attendants'] });
    
    const entity:Attendant = this.attendantRepository.create(createAttendantDto);
    
    const attendant:Attendant = await this.attendantRepository.save(entity);

    if (!attendant) {
      throw new NotFoundException('Attendant could not be created');
    }

    tournament.attendants.push(attendant);
    await this.tournamentRepository.save(tournament);

    return attendant;
  }

  findAll() {
    return `This action returns all attendant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendant`;
  }

  update(id: number, updateAttendantDto: UpdateAttendantDto) {
    return `This action updates a #${id} attendant`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendant`;
  }
}
