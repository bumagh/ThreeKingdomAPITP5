import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma/prisma.service';
import { md5 } from '../../common/utils/md5.util';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const passwordHash = md5(password);

    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (!admin || admin.password !== passwordHash) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    if (admin.status !== 1) {
      throw new UnauthorizedException('账号已被禁用');
    }

    // 生成 JWT token
    const payload = { aid: admin.id };
    const token = this.jwtService.sign(payload);

    // 获取区服列表
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

    // 兼容旧 API 响应格式
    return {
      code: 0,
      msg: '登录成功',
      data: {
        token,
        zoneList: zones,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password, invitecode } = registerDto;
    const passwordHash = md5(password);

    // 验证邀请码
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

    // 检查用户名是否已存在
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      return {
        code: 0,
        msg: '用户名已存在',
        data: null,
      };
    }

    // 创建用户
    const admin = await this.prisma.admin.create({
      data: {
        username,
        password: passwordHash,
        status: 1,
      },
    });

    // 创建背包
    await this.prisma.bag.create({
      data: {
        admin_id: admin.id,
        soldiermax: 10,
        battlemax: 2,
        status: 1,
      },
    });

    // 更新邀请码状态
    await this.prisma.invite.update({
      where: { id: invite.id },
      data: { status: 0, invitee_id: admin.id },
    });

    return {
      code: 1,
      msg: '注册成功',
      data: { admin_id: admin.id },
    };
  }
}
