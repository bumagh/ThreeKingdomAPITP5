import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class VersionService {
  constructor(private prisma: PrismaService) {}

  async getLatestVersion() {
    const versions = await this.prisma.version.findMany({
      orderBy: { create_time: 'desc' },
      take: 10,
    });

    const formattedVersions = versions.map(v => ({
      version: v.version,
      description: v.content,
      apkurl: '',
      create_time: v.create_time,
    }));

    return {
      code: 1,
      msg: '获取成功',
      data: formattedVersions,
    };
  }

  async saveVersion(data: any) {
    const { version, content } = data;

    const newVersion = await this.prisma.version.create({
      data: {
        version,
        content,
      },
    });

    return {
      code: 1,
      msg: '保存成功',
      data: newVersion,
    };
  }

  async incrementSave(versionId: number, data: any) {
    const { content } = data;

    const updatedVersion = await this.prisma.version.update({
      where: { id: versionId },
      data: { content },
    });

    return {
      code: 1,
      msg: '更新成功',
      data: updatedVersion,
    };
  }
}
