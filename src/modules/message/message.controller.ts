import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';

@Controller('api/v1.message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('character/:characterId')
  async getMessagesByCharacter(
    @CurrentAdmin() admin: { id: number },
    @Param('characterId') characterId: number,
    @Query('limit') limit?: string,
  ) {
    return this.messageService.getMessagesByCharacter(admin.id, characterId, limit ? parseInt(limit) : 3);
  }

  @Get('zone/:zoneId')
  async getMessagesByZone(
    @CurrentAdmin() admin: { id: number },
    @Param('zoneId') zoneId: number,
    @Query('limit') limit?: string,
  ) {
    return this.messageService.getMessagesByZone(admin.id, zoneId, limit ? parseInt(limit) : 50);
  }

  @Post('send')
  async sendMessage(
    @CurrentAdmin() admin: { id: number },
    @Body() body: any,
  ) {
    return this.messageService.sendMessage(admin.id, body);
  }
}
