import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';
import { SelectZoneDto } from './dto/select-zone.dto';

@Injectable()
export class ZoneService {
  constructor(private prisma: PrismaService) {}

  async getZones() {
    const zones = await this.prisma.zone.findMany({
      where: { status: 1 },
      select: {
        id: true,
        name: true,
        index: true,
        status: true,
        tag: true,
        player_counts: true,
      },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: zones,
    };
  }

  async selectZone(adminId: number, selectZoneDto: SelectZoneDto) {
    const { zone_id } = selectZoneDto;

    // 验证区服是否存在
    const zone = await this.prisma.zone.findUnique({
      where: { id: zone_id },
    });

    if (!zone) {
      throw new NotFoundException('区服不存在');
    }

    // 更新 admin 的 zone_id
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { zone_id },
    });

    // 获取该区服的角色列表
    const characters = await this.prisma.character.findMany({
      where: {
        admin_id: adminId,
        zone_id,
        status: 1,
      },
      select: {
        id: true,
        name: true,
        level: true,
        job: true,
        gender: true,
        head: true,
        country: true,
        status: true,
      },
    });

    return {
      code: 0,
      msg: '选择区服成功',
      data: {
        characterList: characters,
      },
    };
  }
}
