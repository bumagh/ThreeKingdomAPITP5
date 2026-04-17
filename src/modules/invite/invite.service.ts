import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class InviteService {
  constructor(private prisma: PrismaService) {}

  async getInvites(adminId: number) {
    const invites = await this.prisma.invite.findMany({
      where: { admin_id: adminId },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: invites,
    };
  }

  async validateInvite(invitecode: string) {
    const invite = await this.prisma.invite.findUnique({
      where: { invitecode },
    });

    if (!invite || invite.status !== 1) {
      return {
        code: 0,
        msg: '邀请码无效',
        data: null,
      };
    }

    return {
      code: 1,
      msg: '邀请码有效',
      data: invite,
    };
  }

  async saveInvite(adminId: number, data: any) {
    const { invitecode, status } = data;

    let invite;
    if (data.id) {
      // 更新
      invite = await this.prisma.invite.update({
        where: { id: data.id },
        data: { invitecode, status },
      });
    } else {
      // 创建
      invite = await this.prisma.invite.create({
        data: {
          admin_id: adminId,
          invitecode,
          status: status || 1,
        },
      });
    }

    return {
      code: 1,
      msg: '保存成功',
      data: invite,
    };
  }

  async incrementSave(inviteId: number, data: any) {
    const { status } = data;

    const updatedInvite = await this.prisma.invite.update({
      where: { id: inviteId },
      data: { status },
    });

    return {
      code: 1,
      msg: '更新成功',
      data: updatedInvite,
    };
  }
}
