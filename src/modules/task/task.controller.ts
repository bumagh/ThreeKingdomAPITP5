import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';

@Controller('api/v1.task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('character/:characterId')
  async getTasksByCharacter(
    @CurrentAdmin() admin: { id: number },
    @Param('characterId') characterId: number,
  ) {
    return this.taskService.getTasksByCharacter(admin.id, characterId);
  }

  @Post('save')
  async saveTask(
    @CurrentAdmin() admin: { id: number },
    @Body() body: any,
  ) {
    return this.taskService.saveTask(admin.id, body);
  }

  @Post('increment')
  async incrementSave(
    @CurrentAdmin() admin: { id: number },
    @Body() body: { id: number; [key: string]: any },
  ) {
    return this.taskService.incrementSave(admin.id, body.id, body);
  }
}
