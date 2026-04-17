import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('api/v1.admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAdmins() {
    return this.adminService.getAdmins();
  }

  @Post('save')
  async saveAdmin(@Body() body: any) {
    return this.adminService.saveAdmin(body);
  }

  @Delete('delete')
  async deleteAdmin(@Body() body: { id: number }) {
    return this.adminService.deleteAdmin(body.id);
  }

  @Get(':adminId/roles')
  async getAdminRoles(@Param('adminId') adminId: number) {
    return this.adminService.getAdminRoles(adminId);
  }

  @Post(':adminId/roles')
  async saveAdminRoles(
    @Param('adminId') adminId: number,
    @Body() body: { role_ids: string },
  ) {
    return this.adminService.saveAdminRoles(adminId, body.role_ids);
  }
}
