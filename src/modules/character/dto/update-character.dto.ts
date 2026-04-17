import { IsInt, IsOptional } from 'class-validator';

export class UpdateCharacterDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsInt()
  @IsOptional()
  hppoint?: number;

  @IsInt()
  @IsOptional()
  mppoint?: number;

  @IsInt()
  @IsOptional()
  atkpoint?: number;

  @IsInt()
  @IsOptional()
  sppoint?: number;
}
