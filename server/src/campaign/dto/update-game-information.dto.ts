import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateGameInformationDto {
  @IsBoolean()
  @IsNotEmpty()
  played_the_game!: boolean;

  @IsBoolean()
  @IsNotEmpty()
  finished_the_game!: boolean;
}
