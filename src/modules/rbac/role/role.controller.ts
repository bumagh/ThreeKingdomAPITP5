import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('api/v1.role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getRoles() {
    return this.roleService.getRoles();
  }

  @Post('save')
  async saveRole(@Body() body: any) {
    return this.roleService.saveRole(body);
  }

  @Delete('delete')
  async deleteRole(@Body() body: { id: number }) {
    return this.roleService.deleteRole(body.id);
  }
}
