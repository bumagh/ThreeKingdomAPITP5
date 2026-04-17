import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  controllers: [VersionController],
  providers: [VersionService],
  exports: [VersionService],
})
export class VersionModule {}
