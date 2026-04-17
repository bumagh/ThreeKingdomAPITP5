import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { VersionService } from './version.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/v1.version')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Get('newindex')
  async getLatestVersion() {
    return this.versionService.getLatestVersion();
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async saveVersion(@Body() body: any) {
    return this.versionService.saveVersion(body);
  }

  @Post('increment')
  @UseGuards(JwtAuthGuard)
  async incrementSave(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.versionService.incrementSave(id, body);
  }
}
