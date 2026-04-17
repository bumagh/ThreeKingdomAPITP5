import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';

@Controller('api/v1.invite')
@UseGuards(JwtAuthGuard)
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Get()
  async getInvites(@CurrentAdmin() admin: { id: number }) {
    return this.inviteService.getInvites(admin.id);
  }

  @Post('validate')
  async validateInvite(@Body() body: { invitecode: string }) {
    return this.inviteService.validateInvite(body.invitecode);
  }

  @Post('save')
  async saveInvite(
    @CurrentAdmin() admin: { id: number },
    @Body() body: any,
  ) {
    return this.inviteService.saveInvite(admin.id, body);
  }

  @Post('increment')
  async incrementSave(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.inviteService.incrementSave(id, body);
  }
}
