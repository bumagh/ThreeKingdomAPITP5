import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginGameController } from './login-game.controller';
import { LoginGameService } from './login-game.service';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { BagModule } from '../bag/bag.module';
import { GoodsModule } from '../goods/goods.module';
import { SoldierModule } from '../soldier/soldier.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
    BagModule,
    GoodsModule,
    SoldierModule,
    TaskModule,
  ],
  controllers: [LoginGameController],
  providers: [LoginGameService],
  exports: [LoginGameService],
})
export class LoginGameModule {}
