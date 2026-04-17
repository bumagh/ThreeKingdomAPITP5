import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTasksByCharacter(adminId: number, characterId: number) {
    // 验证角色所有权
    const character = await this.prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new NotFoundException('角色不存在');
    }

    if (character.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此角色');
    }

    const tasks = await this.prisma.task.findMany({
      where: { character_id: characterId },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: tasks,
    };
  }

  async saveTask(adminId: number, data: any) {
    const { id, character_id, configid, status } = data;

    // 验证角色所有权
    const character = await this.prisma.character.findUnique({
      where: { id: character_id },
    });

    if (!character) {
      throw new NotFoundException('角色不存在');
    }

    if (character.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此角色');
    }

    let task;
    if (id) {
      // 更新
      task = await this.prisma.task.update({
        where: { id },
        data: {
          configid,
          status,
        },
      });
    } else {
      // 创建
      task = await this.prisma.task.create({
        data: {
          character_id,
          configid,
          status: status || 1,
        },
      });
    }

    return {
      code: 1,
      msg: '保存成功',
      data: task,
    };
  }

  async incrementSave(adminId: number, taskId: number, data: any) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { character: true },
    });

    if (!task) {
      throw new NotFoundException('任务不存在');
    }

    if (task.character.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此任务');
    }

    // 允许的字段白名单
    const allowedFields = ['status'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return {
      code: 1,
      msg: '更新成功',
      data: updatedTask,
    };
  }
}
