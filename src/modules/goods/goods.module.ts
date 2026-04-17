import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService],
})
export class GoodsModule {}
