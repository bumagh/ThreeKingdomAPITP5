import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BagService } from './bag.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';

@Controller('api/v1.bag')
@UseGuards(JwtAuthGuard)
export class BagController {
  constructor(private bagService: BagService) {}

  @Get()
  async getBags(@CurrentAdmin() admin: { id: number }) {
    return this.bagService.getBags(admin.id);
  }

  @Get('character/:characterId')
  async getBagByCharacter(
    @CurrentAdmin() admin: { id: number },
    @Param('characterId') characterId: number,
  ) {
    return this.bagService.getBagByCharacter(admin.id, characterId);
  }

  @Post('increment')
  async incrementSave(
    @CurrentAdmin() admin: { id: number },
    @Body() body: { id: number; [key: string]: any },
  ) {
    return this.bagService.incrementSave(admin.id, body.id, body);
  }
}
