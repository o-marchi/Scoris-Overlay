import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsBoolean()
  @IsOptional()
  suggestion: boolean;

  @IsString()
  @IsOptional()
  steam: string;

  @IsString()
  @IsOptional()
  trailer: string;
}
