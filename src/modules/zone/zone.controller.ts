import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';
import { SelectZoneDto } from './dto/select-zone.dto';

@Controller('api/v1.zone')
@UseGuards(JwtAuthGuard)
export class ZoneController {
  constructor(private zoneService: ZoneService) {}

  @Get()
  async getZones() {
    return this.zoneService.getZones();
  }

  @Get('selZone')
  async selectZone(
    @CurrentAdmin() admin: { id: number },
    @Query('zoneId') zoneId: number,
  ) {
    return this.zoneService.selectZone(admin.id, { zone_id: zoneId });
  }
}
