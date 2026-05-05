import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateExampleDto {
  @IsOptional()
  @IsString()
  textYi?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
