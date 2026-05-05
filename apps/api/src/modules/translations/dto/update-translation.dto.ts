import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTranslationDto {
  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
