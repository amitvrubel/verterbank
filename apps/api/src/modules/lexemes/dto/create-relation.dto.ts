import { IsEnum, IsString } from 'class-validator';
import { RelationType } from '@prisma/client';

export class CreateRelationDto {
  @IsString()
  toLexemeId: string;

  @IsEnum(RelationType)
  type: RelationType;
}
