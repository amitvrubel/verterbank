import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  @MaxLength(3)
  lang!: string;

  @IsString()
  @MaxLength(200)
  text!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
