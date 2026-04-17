import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BagService } from './bag.service';
import { BagController } from './bag.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  controllers: [BagController],
  providers: [BagService],
  exports: [BagService],
})
export class BagModule {}
