import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @MaxLength(1000)
  textYi!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
