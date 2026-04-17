import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdmins() {
    const admins = await this.prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        status: true,
        zone_id: true,
        create_time: true,
      },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: admins,
    };
  }

  async saveAdmin(data: any) {
    const { id, username, password, status, zone_id } = data;

    let admin;
    if (id) {
      const updateData: any = { username, status, zone_id };
      if (password) {
        updateData.password = password;
      }
      admin = await this.prisma.admin.update({
        where: { id },
        data: updateData,
      });
    } else {
      admin = await this.prisma.admin.create({
        data: { username, password, status: status || 1, zone_id },
      });
    }

    return {
      code: 1,
      msg: '保存成功',
      data: admin,
    };
  }

  async deleteAdmin(id: number) {
    await this.prisma.admin.delete({
      where: { id },
    });

    return {
      code: 1,
      msg: '删除成功',
      data: null,
    };
  }

  async getAdminRoles(adminId: number) {
    const adminRole = await this.prisma.adminRole.findUnique({
      where: { admin_id: adminId },
      include: { roles: true },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: adminRole,
    };
  }

  async saveAdminRoles(adminId: number, roleIds: string) {
    const adminRole = await this.prisma.adminRole.upsert({
      where: { admin_id: adminId },
      create: { admin_id: adminId, role_ids: roleIds },
      update: { role_ids: roleIds },
    });

    return {
      code: 1,
      msg: '保存成功',
      data: adminRole,
    };
  }
}
