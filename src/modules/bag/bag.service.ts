import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BagService {
  constructor(private prisma: PrismaService) {}

  async getBags(adminId: number) {
    const bags = await this.prisma.bag.findMany({
      where: { admin_id: adminId },
      select: {
        id: true,
        soldiermax: true,
        battlemax: true,
        status: true,
        character_id: true,
      },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: bags,
    };
  }

  async getBagByCharacter(adminId: number, characterId: number) {
    // 验证角色所有权
    const character = await this.prisma.character.findUnique({
      where: { id: characterId },
      include: { bag: true },
    });

    if (!character) {
      throw new NotFoundException('角色不存在');
    }

    if (character.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此角色');
    }

    return {
      code: 1,
      msg: '获取成功',
      data: character.bag,
    };
  }

  async incrementSave(adminId: number, bagId: number, data: any) {
    // 验证背包所有权
    const bag = await this.prisma.bag.findUnique({
      where: { id: bagId },
    });

    if (!bag) {
      throw new NotFoundException('背包不存在');
    }

    if (bag.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此背包');
    }

    // 允许的字段白名单
    const allowedFields = ['soldiermax', 'battlemax', 'status'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const updatedBag = await this.prisma.bag.update({
      where: { id: bagId },
      data: updateData,
    });

    return {
      code: 1,
      msg: '更新成功',
      data: updatedBag,
    };
  }
}
