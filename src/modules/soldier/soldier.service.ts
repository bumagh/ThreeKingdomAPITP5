import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SoldierService {
  constructor(private prisma: PrismaService) {}

  async getSoldiersByCharacter(adminId: number, characterId: number) {
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

    const soldiers = await this.prisma.soldier.findMany({
      where: { character_id: characterId },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: soldiers,
    };
  }

  async saveSoldier(adminId: number, data: any) {
    const { id, character_id, config_id, level, points, hppoint, mppoint, atkpoint, sppoint, hp, mp, job, country } = data;

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

    let soldier;
    if (id) {
      // 更新
      soldier = await this.prisma.soldier.update({
        where: { id },
        data: {
          config_id,
          level,
          points,
          hppoint,
          mppoint,
          atkpoint,
          sppoint,
          hp,
          mp,
          job,
          country,
        },
      });
    } else {
      // 创建
      soldier = await this.prisma.soldier.create({
        data: {
          character_id,
          config_id,
          level: level || 1,
          points: points || 0,
          hppoint: hppoint || 0,
          mppoint: mppoint || 0,
          atkpoint: atkpoint || 0,
          sppoint: sppoint || 0,
          hp: hp || 100,
          mp: mp || 100,
          job,
          country,
        },
      });
    }

    return {
      code: 1,
      msg: '保存成功',
      data: soldier,
    };
  }

  async incrementSave(adminId: number, soldierId: number, data: any) {
    const soldier = await this.prisma.soldier.findUnique({
      where: { id: soldierId },
      include: { character: true },
    });

    if (!soldier) {
      throw new NotFoundException('副将不存在');
    }

    if (soldier.character.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此副将');
    }

    // 允许的字段白名单
    const allowedFields = ['level', 'points', 'hppoint', 'mppoint', 'atkpoint', 'sppoint', 'hp', 'mp'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const updatedSoldier = await this.prisma.soldier.update({
      where: { id: soldierId },
      data: updateData,
    });

    return {
      code: 1,
      msg: '更新成功',
      data: updatedSoldier,
    };
  }

  async usePoints(adminId: number, soldierId: number, data: any) {
    const { hppoint, mppoint, atkpoint, sppoint } = data;

    const soldier = await this.prisma.soldier.findUnique({
      where: { id: soldierId },
      include: { character: true },
    });

    if (!soldier) {
      throw new NotFoundException('副将不存在');
    }

    if (soldier.character.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此副将');
    }

    const totalPoints = (hppoint || 0) + (mppoint || 0) + (atkpoint || 0) + (sppoint || 0);

    if (totalPoints > soldier.points) {
      return {
        code: 0,
        msg: '属性点不足',
        data: null,
      };
    }

    const updatedSoldier = await this.prisma.soldier.update({
      where: { id: soldierId },
      data: {
        points: { decrement: totalPoints },
        hppoint: { increment: hppoint || 0 },
        mppoint: { increment: mppoint || 0 },
        atkpoint: { increment: atkpoint || 0 },
        sppoint: { increment: sppoint || 0 },
        hp: soldier.hp + (hppoint || 0) * 10,
        mp: soldier.mp + (mppoint || 0) * 10,
      },
    });

    return {
      code: 1,
      msg: '加点成功',
      data: updatedSoldier,
    };
  }
}
