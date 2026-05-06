import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  Degree,
  GrammaticalCase,
  GrammaticalGender,
  GrammaticalNumber,
  Mood,
  PublishStatus,
  Tense,
} from '@prisma/client';

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  valueOrth?: string;

  @IsOptional()
  @IsString()
  valueSearch?: string;

  @IsOptional()
  @IsEnum(GrammaticalNumber)
  number?: GrammaticalNumber;

  @IsOptional()
  @IsInt()
  @Min(1)
  person?: number;

  @IsOptional()
  @IsEnum(Tense)
  tense?: Tense;

  @IsOptional()
  @IsEnum(Mood)
  mood?: Mood;

  @IsOptional()
  @IsEnum(Degree)
  degree?: Degree;

  @IsOptional()
  @IsEnum(GrammaticalGender)
  gender?: GrammaticalGender;

  @IsOptional()
  @IsEnum(GrammaticalCase)
  case?: GrammaticalCase;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
