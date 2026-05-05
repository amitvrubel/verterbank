import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PublishStatus } from '@prisma/client';

export class UpdateSenseDto {
  @IsOptional()
  @IsString()
  definitionYi: string;

  @IsOptional()
  @IsString()
  glossYi: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order: number;

  @IsOptional()
  @IsEnum(PublishStatus)
  status: PublishStatus;
}
