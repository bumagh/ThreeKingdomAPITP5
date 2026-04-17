import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  zone_id: number;

  @IsInt()
  @IsNotEmpty()
  country: number;

  @IsInt()
  @IsNotEmpty()
  job: number;

  @IsInt()
  @IsNotEmpty()
  gender: number;

  @IsInt()
  @IsOptional()
  head?: number;
}
