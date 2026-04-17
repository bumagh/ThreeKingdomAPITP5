import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('api/v1.character')
@UseGuards(JwtAuthGuard)
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  async getCharacters(
    @CurrentAdmin() admin: { id: number },
    @Query('zone_id') zoneId?: number,
  ) {
    return this.characterService.getCharacters(admin.id, zoneId);
  }

  @Get('ranking')
  async getCharacterRanking(
    @Query('zone_id') zoneId: string,
    @Query('limit') limit?: string,
  ) {
    return this.characterService.getCharacterRanking(parseInt(zoneId), limit ? parseInt(limit) : 10);
  }

  @Post('add')
  async createCharacter(
    @CurrentAdmin() admin: { id: number },
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    return this.characterService.createCharacter(admin.id, createCharacterDto);
  }

  @Post('usePoints')
  async usePoints(
    @CurrentAdmin() admin: { id: number },
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    const characterId = updateCharacterDto.id;
    if (!characterId) {
      return { code: 0, msg: '缺少角色ID', data: null };
    }
    return this.characterService.usePoints(admin.id, characterId, updateCharacterDto);
  }
}
