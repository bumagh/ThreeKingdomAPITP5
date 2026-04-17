import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SoldierService } from './soldier.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';

@Controller('api/v1.soldier')
@UseGuards(JwtAuthGuard)
export class SoldierController {
  constructor(private soldierService: SoldierService) {}

  @Get('character/:characterId')
  async getSoldiersByCharacter(
    @CurrentAdmin() admin: { id: number },
    @Param('characterId') characterId: number,
  ) {
    return this.soldierService.getSoldiersByCharacter(admin.id, characterId);
  }

  @Post('save')
  async saveSoldier(
    @CurrentAdmin() admin: { id: number },
    @Body() body: any,
  ) {
    return this.soldierService.saveSoldier(admin.id, body);
  }

  @Post('increment')
  async incrementSave(
    @CurrentAdmin() admin: { id: number },
    @Body() body: { id: number; [key: string]: any },
  ) {
    return this.soldierService.incrementSave(admin.id, body.id, body);
  }

  @Post('usePoints')
  async usePoints(
    @CurrentAdmin() admin: { id: number },
    @Body() body: { id: number; [key: string]: any },
  ) {
    return this.soldierService.usePoints(admin.id, body.id, body);
  }
}
