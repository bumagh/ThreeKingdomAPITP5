import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';

@Controller('api/v1.goods')
@UseGuards(JwtAuthGuard)
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Post('getByBagId')
  async getGoodsByBag(
    @CurrentAdmin() admin: { id: number },
    @Body() body: { bag_id: number },
  ) {
    return this.goodsService.getGoodsByBag(admin.id, body.bag_id);
  }

  @Post('save')
  async saveGoods(
    @CurrentAdmin() admin: { id: number },
    @Body() body: any,
  ) {
    return this.goodsService.saveGoods(admin.id, body);
  }

  @Post('incGoods')
  async incrementSave(
    @CurrentAdmin() admin: { id: number },
    @Body() body: { id: number; [key: string]: any },
  ) {
    return this.goodsService.incrementSave(admin.id, body.id, body);
  }
}
