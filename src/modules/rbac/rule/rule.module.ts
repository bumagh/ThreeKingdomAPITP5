import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  controllers: [RuleController],
  providers: [RuleService],
  exports: [RuleService],
})
export class RuleModule {}
