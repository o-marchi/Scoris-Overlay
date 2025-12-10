import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePoolOptionDto {
  @IsNumber()
  gameId: number;
}

export class CreatePoolDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePoolOptionDto)
  options: CreatePoolOptionDto[];
}
