import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PublishStatus } from '@prisma/client';

export class CreateSenseDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  definitionYi?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  glossYi?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
