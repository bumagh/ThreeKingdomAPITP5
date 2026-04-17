import { IsInt, IsNotEmpty } from 'class-validator';

export class SelectZoneDto {
  @IsInt()
  @IsNotEmpty()
  zone_id: number;
}
