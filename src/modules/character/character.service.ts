import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async getCharacters(adminId: number, zoneId?: number) {
    const where: any = {
      admin_id: adminId,
      status: 1,
    };
    if (zoneId) {
      where.zone_id = zoneId;
    }

    const characters = await this.prisma.character.findMany({
      where,
      select: {
        id: true,
        name: true,
        level: true,
        job: true,
        gender: true,
        head: true,
        country: true,
        status: true,
        points: true,
        hp: true,
        mp: true,
        hppoint: true,
        mppoint: true,
        atkpoint: true,
        sppoint: true,
      },
    });

    return {
      code: 0,
      msg: '获取成功',
      data: characters,
    };
  }

  async getCharacterRanking(zoneId: number, limit = 10) {
    const characters = await this.prisma.character.findMany({
      where: {
        zone_id: zoneId,
        status: 1,
      },
      orderBy: { level: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        level: true,
        job: true,
        country: true,
      },
    });

    return {
      code: 0,
      msg: '获取成功',
      data: characters,
    };
  }

  async createCharacter(adminId: number, createCharacterDto: CreateCharacterDto) {
    const { zone_id, name, country, job, gender, head } = createCharacterDto;

    // 验证区服
    const zone = await this.prisma.zone.findUnique({
      where: { id: zone_id },
    });
    if (!zone || zone.status !== 1) {
      return {
        code: 0,
        msg: '区服不存在或已关闭',
        data: null,
      };
    }

    // 创建背包
    const bag = await this.prisma.bag.create({
      data: {
        admin_id: adminId,
        soldiermax: 10,
        battlemax: 2,
        status: 1,
      },
    });

    // 创建角色
    const character = await this.prisma.character.create({
      data: {
        admin_id: adminId,
        zone_id,
        bag_id: bag.id,
        name,
        country,
        job,
        gender,
        head: head || 0,
        status: 1,
        level: 1,
        exp: 0,
        coin: 0,
        points: 0,
        hp: 100,
        mp: 100,
        hppoint: 0,
        mppoint: 0,
        atkpoint: 0,
        sppoint: 0,
      },
    });

    // 更新背包关联
    await this.prisma.bag.update({
      where: { id: bag.id },
      data: { character_id: character.id },
    });

    // 创建初始任务
    await this.prisma.task.create({
      data: {
        character_id: character.id,
        configid: 1,
        status: 1,
      },
    });

    return {
      code: 0,
      msg: '创建成功',
      data: {
        character_id: character.id,
        bag_id: bag.id,
        name: character.name,
        level: character.level,
        job: character.job,
        country: character.country,
      },
    };
  }

  async usePoints(adminId: number, characterId: number, updateCharacterDto: UpdateCharacterDto) {
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

    const { hppoint, mppoint, atkpoint, sppoint } = updateCharacterDto;
    const totalPoints = (hppoint || 0) + (mppoint || 0) + (atkpoint || 0) + (sppoint || 0);

    if (totalPoints > character.points) {
      return {
        code: 0,
        msg: '属性点不足',
        data: null,
      };
    }

    const updatedCharacter = await this.prisma.character.update({
      where: { id: characterId },
      data: {
        points: { decrement: totalPoints },
        hppoint: { increment: hppoint || 0 },
        mppoint: { increment: mppoint || 0 },
        atkpoint: { increment: atkpoint || 0 },
        sppoint: { increment: sppoint || 0 },
        hp: character.hp + (hppoint || 0) * 10,
        mp: character.mp + (mppoint || 0) * 10,
      },
    });

    return {
      code: 0,
      msg: '加点成功',
      data: {
        points: updatedCharacter.points,
        hppoint: updatedCharacter.hppoint,
        mppoint: updatedCharacter.mppoint,
        atkpoint: updatedCharacter.atkpoint,
        sppoint: updatedCharacter.sppoint,
        hp: updatedCharacter.hp,
        mp: updatedCharacter.mp,
      },
    };
  }
}
