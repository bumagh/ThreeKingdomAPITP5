import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getRoles() {
    const roles = await this.prisma.role.findMany();

    return {
      code: 1,
      msg: '获取成功',
      data: roles,
    };
  }

  async saveRole(data: any) {
    const { id, name, status } = data;

    let role;
    if (id) {
      role = await this.prisma.role.update({
        where: { id },
        data: { name, status },
      });
    } else {
      role = await this.prisma.role.create({
        data: { name, status: status || 1 },
      });
    }

    return {
      code: 1,
      msg: '保存成功',
      data: role,
    };
  }

  async deleteRole(id: number) {
    await this.prisma.role.delete({
      where: { id },
    });

    return {
      code: 1,
      msg: '删除成功',
      data: null,
    };
  }
}
