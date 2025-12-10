import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  month!: string;

  @IsString()
  @IsNotEmpty()
  year!: string;

  @IsBoolean()
  @IsOptional()
  current?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value, obj }) => value ?? obj?.game_id, { toClassOnly: true })
  @Min(1)
  gameId?: number;

  @IsBoolean()
  @IsOptional()
  electionActive?: boolean;

  @IsOptional()
  @IsInt()
  @Transform(({ value, obj }) => value ?? obj?.pool_id, { toClassOnly: true })
  @Min(1)
  poolId?: number;
}
