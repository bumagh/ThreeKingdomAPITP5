import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
