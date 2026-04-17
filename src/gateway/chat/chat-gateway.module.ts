import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'api',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '365d') as any },
    }),
  ],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatGatewayModule {}
