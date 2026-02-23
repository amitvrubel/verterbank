import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  Degree,
  GrammaticalGender,
  GrammaticalNumber,
  Mood,
  PublishStatus,
  Tense,
} from '@prisma/client';

export class CreateFormDto {
  @IsString()
  @MaxLength(200)
  valueOrth!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  yivo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  ipa?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsEnum(PublishStatus)
  publishStatus?: PublishStatus;

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
}
