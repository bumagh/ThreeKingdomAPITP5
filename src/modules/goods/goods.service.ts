import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class GoodsService {
  constructor(private prisma: PrismaService) {}

  async getGoodsByBag(adminId: number, bagId: number) {
    // 验证背包所有权
    const bag = await this.prisma.bag.findUnique({
      where: { id: bagId },
    });

    if (!bag) {
      throw new NotFoundException('背包不存在');
    }

    if (bag.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此背包');
    }

    const goods = await this.prisma.goods.findMany({
      where: { bag_id: bagId },
    });

    return {
      code: 1,
      msg: '获取成功',
      data: goods,
    };
  }

  async saveGoods(adminId: number, data: any) {
    const { id, configid, count, status, bag_id } = data;

    // 验证背包所有权
    const bag = await this.prisma.bag.findUnique({
      where: { id: bag_id },
    });

    if (!bag) {
      throw new NotFoundException('背包不存在');
    }

    if (bag.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此背包');
    }

    let goods;
    if (id) {
      // 更新
      goods = await this.prisma.goods.update({
        where: { id },
        data: {
          configid,
          count,
          status,
        },
      });
    } else {
      // 创建
      goods = await this.prisma.goods.create({
        data: {
          bag_id,
          configid,
          count,
          status,
        },
      });
    }

    return {
      code: 1,
      msg: '保存成功',
      data: goods,
    };
  }

  async incrementSave(adminId: number, goodsId: number, data: any) {
    const goods = await this.prisma.goods.findUnique({
      where: { id: goodsId },
      include: { bag: true },
    });

    if (!goods) {
      throw new NotFoundException('物品不存在');
    }

    if (goods.bag.admin_id !== adminId) {
      throw new ForbiddenException('无权操作此物品');
    }

    // 允许的字段白名单
    const allowedFields = ['count', 'status'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const updatedGoods = await this.prisma.goods.update({
      where: { id: goodsId },
      data: updateData,
    });

    return {
      code: 1,
      msg: '更新成功',
      data: updatedGoods,
    };
  }
}
