import { Module } from '@nestjs/common';
import { RegAdminController } from './reg-admin.controller';
import { RegAdminService } from './reg-admin.service';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RegAdminController],
  providers: [RegAdminService],
  exports: [RegAdminService],
})
export class RegAdminModule {}
