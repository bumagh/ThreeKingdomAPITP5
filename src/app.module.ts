import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { ZoneModule } from './modules/zone/zone.module';
import { CharacterModule } from './modules/character/character.module';
import { BagModule } from './modules/bag/bag.module';
import { GoodsModule } from './modules/goods/goods.module';
import { SoldierModule } from './modules/soldier/soldier.module';
import { TaskModule } from './modules/task/task.module';
import { MessageModule } from './modules/message/message.module';
import { VersionModule } from './modules/version/version.module';
import { InviteModule } from './modules/invite/invite.module';
import { RoleModule } from './modules/rbac/role/role.module';
import { RuleModule } from './modules/rbac/rule/rule.module';
import { AdminModule } from './modules/rbac/admin/admin.module';
import { ChatGatewayModule } from './gateway/chat/chat-gateway.module';
import { LoginGameModule } from './modules/login_game/login-game.module';
import { RegAdminModule } from './modules/reg_admin/reg-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    ZoneModule,
    CharacterModule,
    BagModule,
    GoodsModule,
    SoldierModule,
    TaskModule,
    MessageModule,
    VersionModule,
    InviteModule,
    RoleModule,
    RuleModule,
    AdminModule,
    ChatGatewayModule,
    LoginGameModule,
    RegAdminModule,
  ],
})
export class AppModule {}
