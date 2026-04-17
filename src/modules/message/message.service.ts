import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async getMessagesByCharacter(adminId: number, characterId: number, limit = 3) {
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

    const messages = await this.prisma.message.findMany({
      where: {
        character_id: characterId,
      },
      orderBy: { create_time: 'desc' },
      take: limit,
      select: {
        id: true,
        content: true,
        type: true,
        create_time: true,
      },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: messages,
    };
  }

  async getMessagesByZone(adminId: number, zoneId: number, limit = 50) {
    // 验证区服
    const zone = await this.prisma.zone.findUnique({
      where: { id: zoneId },
    });

    if (!zone) {
      throw new NotFoundException('区服不存在');
    }

    const messages = await this.prisma.message.findMany({
      where: { zone_id: zoneId },
      orderBy: { create_time: 'desc' },
      take: limit,
      select: {
        id: true,
        content: true,
        type: true,
        create_time: true,
      },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: messages,
    };
  }

  async sendMessage(adminId: number, data: any) {
    const { character_id, zone_id, content, type } = data;

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

    if (character.zone_id !== zone_id) {
      return {
        code: 0,
        msg: '角色不在该区服',
        data: null,
      };
    }

    const message = await this.prisma.message.create({
      data: {
        character_id,
        zone_id,
        content,
        type: type || 0,
        status: 0,
      },
    });

    return {
      code: 1,
      msg: '发送成功',
      data: message,
    };
  }
}
