import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { BagService } from '../bag/bag.service';
import { GoodsService } from '../goods/goods.service';
import { SoldierService } from '../soldier/soldier.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class LoginGameService {
  constructor(
    private prisma: PrismaService,
    private bagService: BagService,
    private goodsService: GoodsService,
    private soldierService: SoldierService,
    private taskService: TaskService,
  ) {}

  async loginPlayerSel(adminId: number, characterId: number, bagId: number) {
    try {
      // 获取背包物品
      const goods = await this.goodsService.getGoodsByBag(adminId, bagId);
      
      // 获取副将列表
      const soldiers = await this.soldierService.getSoldiersByCharacter(adminId, characterId);
      
      // 获取任务列表
      const tasks = await this.taskService.getTasksByCharacter(adminId, characterId);
      
      return {
        code: 0,
        msg: '获取角色信息成功',
        data: {
          bagItemDatas: goods.data || [],
          soldierItemDatas: soldiers.data || [],
          taskItems: tasks.data || [],
        },
      };
    } catch (error) {
      return {
        code: 1,
        msg: '登录失败',
        data: null,
      };
    }
  }
}
