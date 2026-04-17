import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SoldierService } from './soldier.service';
import { SoldierController } from './soldier.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  controllers: [SoldierController],
  providers: [SoldierService],
  exports: [SoldierService],
})
export class SoldierModule {}
