import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  async getRules() {
    const rules = await this.prisma.rule.findMany();

    return {
      code: 1,
      msg: '获取成功',
      data: rules,
    };
  }

  async saveRule(data: any) {
    const { id, name, pid, url, img, status } = data;

    let rule;
    if (id) {
      rule = await this.prisma.rule.update({
        where: { id },
        data: { name, pid, url, img, status },
      });
    } else {
      rule = await this.prisma.rule.create({
        data: { name, pid: pid || 0, url, img, status: status || 1 },
      });
    }

    return {
      code: 1,
      msg: '保存成功',
      data: rule,
    };
  }

  async deleteRule(id: number) {
    await this.prisma.rule.delete({
      where: { id },
    });

    return {
      code: 1,
      msg: '删除成功',
      data: null,
    };
  }
}
