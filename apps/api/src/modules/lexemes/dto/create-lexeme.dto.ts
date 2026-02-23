import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  PartOfSpeech,
  GrammaticalGender,
  PastAuxiliary,
  PublishStatus,
} from '@prisma/client';
export class CreateLexemeDto {
  @IsEnum(PartOfSpeech)
  partOfSpeech!: PartOfSpeech;

  @IsOptional()
  @IsEnum(GrammaticalGender)
  grammaticalGender?: GrammaticalGender;

  @IsOptional()
  @IsEnum(PastAuxiliary)
  pastAuxiliary?: PastAuxiliary;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  yivo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ipa?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
