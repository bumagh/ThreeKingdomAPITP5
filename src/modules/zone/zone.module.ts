import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  controllers: [ZoneController],
  providers: [ZoneService],
  exports: [ZoneService],
})
export class ZoneModule {}
