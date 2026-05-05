import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  GrammaticalGender,
  PartOfSpeech,
  PastAuxiliary,
  PublishStatus,
} from '@prisma/client';

export class UpdateLexemeDto {
  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: PartOfSpeech;

  @IsOptional()
  @IsEnum(GrammaticalGender)
  grammaticalGender?: GrammaticalGender | null;

  @IsOptional()
  @IsEnum(PastAuxiliary)
  pastAuxiliary?: PastAuxiliary | null;

  @IsOptional()
  @IsString()
  yivo?: string | null;

  @IsOptional()
  @IsString()
  ipa?: string | null;

  @IsOptional()
  @IsString()
  notes?: string | null;

  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
