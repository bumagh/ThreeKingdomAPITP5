import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { md5 } from '../../common/utils/md5.util';

@Injectable()
export class RegAdminService {
  constructor(private prisma: PrismaService) {}

  async register(data: { username: string; password: string; invitecode: string }) {
    const { username, password, invitecode } = data;

    // 验证邀请码
    if (!invitecode) {
      return {
        code: 1,
        msg: '注册失败,邀请码不能为空',
      };
    }

    const invite = await this.prisma.invite.findUnique({
      where: { invitecode },
    });

    if (!invite) {
      return {
        code: 2,
        msg: '注册失败,邀请码不存在',
      };
    }

    // 检查用户名是否已存在
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      return {
        code: 3,
        msg: '注册失败,账号已存在',
      };
    }

    const passwordHash = md5(password);

    // 创建用户
    const admin = await this.prisma.admin.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    if (!admin) {
      return {
        code: 4,
        msg: '注册失败,未知错误001',
      };
    }

    // 创建背包
    const bag = await this.prisma.bag.create({
      data: {
        admin_id: admin.id,
        soldiermax: 10,
        battlemax: 2,
        status: 1,
      },
    });

    if (!bag) {
      return {
        code: 4,
        msg: '注册失败,未知错误003',
      };
    }

    return {
      code: 0,
      msg: '注册成功',
    };
  }
}
