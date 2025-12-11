import { IsEmail, IsOptional, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DiscordProfileDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  globalName?: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  provider: 'Discord' | 'Google';

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @ValidateNested()
  @Type((): typeof DiscordProfileDto => DiscordProfileDto)
  discord?: DiscordProfileDto;
}
