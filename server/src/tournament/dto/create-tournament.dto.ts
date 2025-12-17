import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: 'SINGLES' | 'TEAMS';

  @IsNumber()
  @IsNotEmpty()
  userId!: number;
}
