import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateHeadwordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  orth!: string;
}
