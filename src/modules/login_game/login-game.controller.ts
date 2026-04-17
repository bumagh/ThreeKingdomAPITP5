import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginGameService } from './login-game.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';

@Controller('api/v1.login_game')
@UseGuards(JwtAuthGuard)
export class LoginGameController {
  constructor(private loginGameService: LoginGameService) {}

  @Post('loginPlayerSel')
  async loginPlayerSel(
    @CurrentAdmin() admin: { id: number },
    @Body() body: { bag_id: number | string; character_id: number | string },
  ) {
    const bagId = typeof body.bag_id === 'string' ? parseInt(body.bag_id, 10) : body.bag_id;
    const characterId = typeof body.character_id === 'string' ? parseInt(body.character_id, 10) : body.character_id;
    return this.loginGameService.loginPlayerSel(admin.id, characterId, bagId);
  }
}
