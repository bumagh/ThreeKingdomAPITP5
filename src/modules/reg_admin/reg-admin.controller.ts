import { Controller, Get, Query } from '@nestjs/common';
import { RegAdminService } from './reg-admin.service';

@Controller('api/v1.reg_admin')
export class RegAdminController {
  constructor(private regAdminService: RegAdminService) {}

  @Get('index')
  async register(@Query() query: { username: string; password: string; invitecode: string }) {
    return this.regAdminService.register(query);
  }
}
