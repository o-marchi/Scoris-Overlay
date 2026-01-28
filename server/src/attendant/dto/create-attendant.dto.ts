import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAttendantDto {
  @IsString()
  @IsNotEmpty()
  id!: number;
    
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: 'SINGLES' | 'TEAMS';
  
  @IsString()
  teamName?: string;
}
