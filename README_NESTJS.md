# 三国志 API NestJS 版本

这是从 ThinkPHP 迁移到 NestJS 的三国志游戏后端 API。

## 技术栈

- **框架**: NestJS 11.x
- **语言**: TypeScript
- **数据库**: PostgreSQL
- **ORM**: Prisma 6.x
- **缓存**: Redis (ioredis)
- **认证**: JWT (Passport)
- **WebSocket**: Socket.IO (待实现)

## 项目结构

```
src/
├── common/              # 公共模块
│   ├── prisma/         # Prisma 服务
│   ├── redis/          # Redis 服务
│   ├── decorators/     # 自定义装饰器
│   ├── guards/         # 守卫（认证）
│   └── utils/          # 工具函数
├── modules/            # 业务模块
│   ├── auth/           # 认证模块（登录/注册）
│   ├── zone/           # 区服管理
│   ├── character/      # 角色管理
│   ├── bag/            # 背包管理
│   ├── goods/          # 物品管理
│   ├── soldier/        # 副将管理
│   ├── task/           # 任务管理
│   ├── message/        # 消息管理
│   ├── version/        # 版本管理
│   ├── invite/         # 邀请码管理
│   └── rbac/           # RBAC 权限管理
│       ├── role/       # 角色管理
│       ├── rule/       # 规则管理
│       └── admin/      # 管理员管理
├── gateway/            # WebSocket Gateway
│   └── chat/           # 聊天 Gateway（待实现）
├── app.module.ts       # 根模块
└── main.ts             # 应用入口
```

## 安装依赖

```bash
npm install
```

## 环境配置

复制 `.env.example` 为 `.env` 并配置以下变量：

```env
# 数据库连接
DATABASE_URL="postgresql://username:password@localhost:5432/threekingdom?schema=public"

# JWT 密钥
JWT_SECRET="api"
JWT_EXPIRES_IN="365d"

# Redis 连接
REDIS_HOST="localhost"
REDIS_PORT=6379

# 服务端口
PORT=3000
```

## 数据库迁移

```bash
# 生成 Prisma Client
npm run prisma:generate

# 运行迁移（开发环境）
npm run prisma:migrate
```

## 运行项目

```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

## API 接口

### 认证接口

- `POST /api/login` - 用户登录
- `POST /api/reg` - 用户注册

### 区服接口

- `GET /api/v1/zone` - 获取区服列表
- `POST /api/v1/zone/select` - 选择区服

### 角色接口

- `GET /api/v1/character` - 获取角色列表
- `GET /api/v1/character/ranking` - 获取角色排行榜
- `POST /api/v1/character` - 创建角色
- `POST /api/v1/character/usePoints` - 使用属性点

### 背包接口

- `GET /api/v1/bag` - 获取背包列表
- `GET /api/v1/bag/character/:characterId` - 获取角色背包
- `POST /api/v1/bag/increment` - 增量更新背包

### 物品接口

- `GET /api/v1/goods/bag/:bagId` - 获取背包物品
- `POST /api/v1/goods/save` - 保存物品
- `POST /api/v1/goods/increment` - 增量更新物品

### 副将接口

- `GET /api/v1/soldier/character/:characterId` - 获取角色副将
- `POST /api/v1/soldier/save` - 保存副将
- `POST /api/v1/soldier/increment` - 增量更新副将
- `POST /api/v1/soldier/usePoints` - 使用副将属性点

### 任务接口

- `GET /api/v1/task/character/:characterId` - 获取角色任务
- `POST /api/v1/task/save` - 保存任务
- `POST /api/v1/task/increment` - 增量更新任务

### 消息接口

- `GET /api/v1/message/character/:characterId` - 获取角色消息
- `GET /api/v1/message/zone/:zoneId` - 获取区服消息
- `POST /api/v1/message/send` - 发送消息

### 版本接口

- `GET /api/v1/version` - 获取最新版本
- `POST /api/v1/version/save` - 保存版本
- `POST /api/v1/version/increment` - 增量更新版本

### 邀请码接口

- `GET /api/v1/invite` - 获取邀请码列表
- `POST /api/v1/invite/validate` - 验证邀请码
- `POST /api/v1/invite/save` - 保存邀请码
- `POST /api/v1/invite/increment` - 增量更新邀请码

### RBAC 接口

#### 角色管理

- `GET /api/v1/role` - 获取角色列表
- `POST /api/v1/role/save` - 保存角色
- `DELETE /api/v1/role/delete` - 删除角色

#### 规则管理

- `GET /api/v1/rule` - 获取规则列表
- `POST /api/v1/rule/save` - 保存规则
- `DELETE /api/v1/rule/delete` - 删除规则

#### 管理员管理

- `GET /api/v1/admin` - 获取管理员列表
- `POST /api/v1/admin/save` - 保存管理员
- `DELETE /api/v1/admin/delete` - 删除管理员
- `GET /api/v1/admin/:adminId/roles` - 获取管理员角色
- `POST /api/v1/admin/:adminId/roles` - 保存管理员角色

## 兼容性说明

- 保持与原 ThinkPHP API 相同的响应格式：`{ code, msg, data }`
- 保留 MD5 密码兼容（后续可迁移到 bcrypt）
- 保留原 API 路由路径
- 所有需要认证的接口使用 JWT Bearer Token

## 安全特性

- JWT 认证
- DTO 输入验证
- 资源所有权验证
- 增量更新字段白名单
- 排序字段白名单

## 待完成功能

- [ ] WebSocket 聊天 Gateway
- [ ] E2E 测试
- [ ] 密码迁移到 bcrypt
- [ ] API 文档（Swagger）
- [ ] 日志系统
- [ ] 监控和性能优化

## 开发规范

项目已配置 Windsurf AI 辅助开发，包含：
- `AGENTS.md` - 全局和目录级别的开发规则
- `.windsurf/rules/` - 工作区规则
- `.windsurf/workflows/` - 自动化工作流

详细配置参见 `doc/提示词.md`。
