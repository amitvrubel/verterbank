import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PublishStatus } from '@prisma/client';

export class UpdateHeadwordDto {
  @IsOptional()
  @IsString()
  orth?: string;

  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
