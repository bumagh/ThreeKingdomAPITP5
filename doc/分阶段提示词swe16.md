可以，下面我直接给你一套 **SWE1.6 分阶段执行提示词**。  
这套比“超长一次性总提示词”更适合真实落地，因为它能让模型：

- 每一轮只聚焦一个目标
- 输出更稳定
- 更少跑偏
- 更容易逐轮修正
- 更适合你这种**回合策略 + AI优先 + 旧接口兼容迁移**

---

# 使用建议

建议你按这个顺序喂给 SWE1.6：

1. **第0轮：项目总约束**
2. **第1轮：迁移方案总览**
3. **第2轮：PostgreSQL + Prisma 设计**
4. **第3轮：NestJS 项目骨架**
5. **第4轮：认证 + 区服 + 角色主流程**
6. **第5轮：背包 + 物品 + 副将 + 任务**
7. **第6轮：消息 + WebSocket Gateway**
8. **第7轮：RBAC + 菜单**
9. **第8轮：数据迁移脚本**
10. **第9轮：测试 + 文档 + Docker**

---

# 第0轮：总控提示词

这个建议你每轮都带上，或者至少在开头先发一次。

```markdown
你现在是一个资深 NestJS / TypeScript / PostgreSQL / Redis / 游戏服务端工程师。

当前任务：把一个旧的 ThinkPHP5 + MySQL + JWT 三国游戏后端，迁移为：
- TypeScript
- NestJS
- PostgreSQL
- Redis
- NestJS WebSocket Gateway

全局硬性要求：
1. 优先兼容旧接口路径、旧参数名、旧返回结构
2. 返回格式优先保持：`{ code, msg, data }`
3. 对外兼容旧系统，对内使用更清晰的新架构
4. 项目必须适合 AI 持续生成和维护
5. 不要简单照搬 PHP 写法
6. 所有输入必须有 DTO 校验
7. 所有增量更新必须有字段白名单
8. 所有排序字段必须有白名单
9. 所有事务边界要明确
10. 所有代码必须给完整文件，不要只给片段
11. 输出代码时必须标注文件路径，例如：
   `// file: src/auth/auth.controller.ts`
12. 如果信息不全，请合理假设，并输出到 `ASSUMPTIONS.md`
13. 项目属于回合制策略游戏，不是高频实时游戏
14. WebSocket 当前优先支持：
   - 区服聊天
   - 房间骨架
   - 断线重连预留
15. 服务端必须权威，客户端只能提交操作意图

输出要求：
- 先做设计，再做代码
- 每一轮输出结构统一为：
  1. 本轮目标
  2. 设计说明
  3. 文件列表
  4. 完整代码
  5. 使用说明
  6. 下一步计划

如果理解，请直接执行当前轮次任务，不要重复需求。
```

---

# 第1轮：迁移方案总览

这一轮只让它做架构，不要急着写代码。

```markdown
基于我提供的旧 API 文档与旧表结构，先执行第1轮任务：

# 本轮目标
输出《迁移方案总览》，不要开始写完整业务代码。

# 必须输出内容
1. 新架构总览
2. 架构图文字版
3. 模块划分
4. 旧模块 -> 新模块映射表
5. 路由兼容策略
6. 数据库迁移策略
7. Redis 使用策略
8. WebSocket Gateway 规划
9. 风险点清单
10. 分阶段迁移计划
11. `ASSUMPTIONS.md`

# 特别要求
- 必须明确说明哪些旧接口原样兼容，哪些新增规范化接口
- 必须指出旧系统中的不合理设计：
  - md5 密码
  - `character` 表名问题
  - `zone.index` 字段命名问题
  - `admin_role.role_ids` 逗号字符串
  - `role_rule.rule_ids` 逗号字符串
  - 增量更新注入风险
  - 排序字段注入风险
  - 越权风险
- 必须给出灰度迁移思路：
  - 旧系统继续服务
  - 新系统旁路验证
  - 分模块切流
  - 全量切换
  - 回滚策略

# 输出限制
- 本轮不要输出完整 NestJS 业务代码
- 可以输出少量示意目录树
- 重点是方案，不是实现

现在开始输出《迁移方案总览》。
```

---

# 第2轮：数据库设计 + Prisma Schema

这一轮很关键，建议单独做。

```markdown
继续第2轮任务：

# 本轮目标
输出 PostgreSQL 数据库设计与 Prisma Schema，作为新系统的数据基础。

# 必须输出内容
1. 新数据库 ER 说明
2. 旧表 -> 新表映射关系
3. 字段映射关系
4. 为什么这样迁移
5. PostgreSQL 表设计清单
6. Prisma schema 完整版
7. PostgreSQL 建表 SQL
8. 索引设计
9. 外键设计
10. 唯一约束设计
11. 枚举设计
12. 时间字段规范
13. 数据兼容策略
14. `ASSUMPTIONS.md`

# 强制要求
请主动修复旧设计中的问题：

1. `character` 表改为：
   - `game_characters` 或 `characters`
   - 但接口层仍兼容 old character 语义

2. `zone.index` 改为：
   - `sort_index`

3. `admin_role.role_ids` 改为中间表：
   - `admin_roles`
   - 字段：`admin_id`, `role_id`

4. `role_rule.rule_ids` 改为中间表：
   - `role_rules`
   - 字段：`role_id`, `rule_id`

5. 密码字段支持平滑升级：
   - 新字段使用 bcrypt
   - 保留兼容旧 md5 登录升级逻辑

# 表设计必须覆盖
- admins
- zones
- characters
- bags
- goods
- soldiers
- tasks
- messages
- versions
- invites
- roles
- rules
- admin_roles
- role_rules

# 索引至少考虑
- admins.username unique
- invites.invitecode unique
- goods(bag_id, config_id)
- soldiers(character_id)
- tasks(character_id, config_id)
- messages(zone_id, created_at desc)
- characters(zone_id, level desc)
- characters(admin_id, zone_id)

# 输出要求
- 先给设计说明
- 再给 Prisma schema
- 再给 PostgreSQL SQL
- 再给映射表
- 不要开始写 controller/service

现在开始输出第2轮结果。
```

---

# 第3轮：NestJS 项目骨架

这一轮做可运行骨架。

```markdown
继续第3轮任务：

# 本轮目标
生成 NestJS 项目骨架，确保项目可以启动，并具备后续模块扩展基础。

# 必须输出内容
1. 目录结构
2. `package.json`
3. `tsconfig.json`
4. `nest-cli.json`
5. `.env.example`
6. `src/main.ts`
7. `src/app.module.ts`
8. 配置模块
9. Prisma 模块
10. Redis 模块
11. 公共响应封装
12. 全局异常过滤器
13. 全局拦截器
14. 全局校验管道
15. Swagger 初始化
16. 健康检查模块
17. `docker-compose.yml`
18. `Dockerfile`
19. `README.md` 初版
20. `ASSUMPTIONS.md`

# 目录结构至少包含
- common
- config
- prisma
- redis
- auth
- zones
- characters
- bags
- goods
- soldiers
- tasks
- messages
- versions
- invites
- roles
- rules
- menus
- admin-roles
- role-rules
- gateway
- ranking
- health

# 输出要求
- 必须给完整文件
- 每个文件都标注路径
- 代码必须可运行
- 本轮先做骨架，不实现复杂业务逻辑
- 如果某模块暂未实现，可用 placeholder module，但结构要完整

现在开始输出第3轮结果。
```

---

# 第4轮：认证 + 区服 + 角色主流程

这一轮开始打通最核心流程。

```markdown
继续第4轮任务：

# 本轮目标
实现最小可用主流程：
- 注册
- 登录
- 获取区服
- 选择区服
- 创建角色
- 进入游戏

# 必须兼容的旧接口
- `POST /api/v1/regadmin/index`
- `POST /api/login/index`
- `GET /api/v1/version/index`
- `GET /api/v1/version/newindex`
- `POST /api/v1/zone/selzone`
- `POST /api/v1/character/add`
- `GET /api/v1/logingame/loginplayersel`

# 本轮必须输出
1. auth 模块完整代码
2. versions 模块完整代码
3. zones 模块完整代码
4. characters 模块中“创建角色/角色列表/进入游戏聚合查询”相关代码
5. JWT 鉴权 Guard
6. 同时支持：
   - Header: `token`
   - Header: `Authorization: Bearer xxx`
7. Swagger 注解
8. DTO
9. Prisma 查询逻辑
10. 事务边界说明
11. `ASSUMPTIONS.md`

# 关键兼容要求
1. 登录成功返回：
   - token
   - zoneList

2. 选择区服返回：
   - characterList

3. 进入游戏返回：
   - `bagItemDatas`
   - `soldierItemDatas`
   - `taskItems`

# 强制要求
- 注册必须校验邀请码
- 登录必须兼容旧 md5，并在成功后升级为 bcrypt
- 创建角色必须自动初始化：
  - bag
  - 默认任务（configid=1001）
- 所有写操作必须使用事务
- 所有查询必须防越权
- 旧接口字段名尽量保留

现在开始输出第4轮结果。
```

---

# 第5轮：背包 + 物品 + 副将 + 任务

这一轮补齐大部分游戏静态主流程。

```markdown
继续第5轮任务：

# 本轮目标
实现以下模块的完整业务：
- bags
- goods
- soldiers
- tasks

# 必须兼容的旧接口
- `GET /api/v1/bag/index`
- `GET /api/v1/goods/getbybagid`
- `POST /api/v1/goods/save`
- `POST /api/v1/goods/incsave`
- `POST /api/v1/goods/incgoods`
- `POST /api/v1/goods/equipconfig`

- `GET /api/v1/soldier/index`
- `GET /api/v1/soldier/getbycharacterid`
- `POST /api/v1/soldier/save`
- `POST /api/v1/soldier/incsave`
- `POST /api/v1/soldier/usepoint`

- `GET /api/v1/task/index`
- `POST /api/v1/task/save`
- `POST /api/v1/task/incsave`

- `POST /api/v1/character/save`
- `POST /api/v1/character/incsave`
- `POST /api/v1/character/usepoint`
- `GET /api/v1/character/index`
- `GET /api/v1/character/getrank`

# 强制要求
1. 所有 incsave 接口必须做字段白名单
2. 所有排序字段必须白名单
3. `incgoods` 必须事务化
4. 普通物品按 `(bag_id, config_id)` 合并
5. 装备类物品单独插入
6. `equipconfig` 必须事务化
7. 必须校验物品/副将/任务归属
8. `usepoint` 必须校验 points 足够
9. 排行榜必须防 SQL 注入
10. 所有接口保持 `code/msg/data` 风格

# 本轮必须输出
- Controller
- Service
- DTO
- Prisma 访问代码
- 事务说明
- 安全校验说明
- `ASSUMPTIONS.md`

现在开始输出第5轮结果。
```

---

# 第6轮：消息系统 + WebSocket Gateway

这一轮开始做实时层。

```markdown
继续第6轮任务：

# 本轮目标
实现消息系统 HTTP + WebSocket 双通道能力。

# 必须兼容的旧接口
- `GET /api/v1/message/index`
- `GET /api/v1/message/getlist`
- `POST /api/v1/message/save`

# 同时新增
- ChatGateway
- RoomGateway 最小骨架

# ChatGateway 必须支持事件
- `chat.connect`
- `chat.joinZone`
- `chat.send`
- `chat.message`
- `chat.history`
- `chat.error`

# RoomGateway 必须支持事件
- `room.create`
- `room.join`
- `room.leave`
- `room.ready`
- `room.start`
- `room.submitAction`
- `room.endTurn`
- `room.syncState`
- `room.reconnect`
- `room.dismiss`

# 强制要求
1. WebSocket 必须 token 鉴权
2. 支持旧 token header 语义映射到 socket auth
3. 聊天按区服广播
4. 聊天消息要落库
5. 消息内容要做长度限制
6. 要实现基础限流
7. 留出敏感词过滤挂载点
8. 历史消息支持从 PostgreSQL 获取
9. Redis 用于：
   - 限流辅助
   - 区服在线/连接辅助
   - 房间骨架缓存辅助

# 本轮必须输出
- messages 模块完整代码
- `gateway/chat.gateway.ts`
- `gateway/room.gateway.ts`
- `gateway/ws-auth.guard.ts`
- WebSocket DTO
- Redis 辅助逻辑
- 示例客户端调用格式
- `ASSUMPTIONS.md`

# 注意
- RoomGateway 本轮只做最小骨架
- 不实现复杂战斗结算
- 但必须可扩展为回合制房间服

现在开始输出第6轮结果。
```

---

# 第7轮：RBAC + 菜单系统

这一轮做后台权限。

```markdown
继续第7轮任务：

# 本轮目标
实现 RBAC 权限与菜单系统，替代旧系统中逗号字符串存储设计。

# 必须兼容的旧接口
- `GET /api/v1/admin/index`
- `POST /api/v1/admin/save`
- `POST /api/v1/admin/delete`

- `GET /api/v1/role/index`
- `POST /api/v1/role/save`
- `POST /api/v1/role/delete`

- `GET /api/v1/rule/index`
- `POST /api/v1/rule/save`
- `POST /api/v1/rule/delete`

- `GET /api/v1/rolerule/index`
- `GET /api/v1/rolerule/gettree`
- `GET /api/v1/rolerule/geturlroleid`
- `POST /api/v1/rolerule/save`

- `GET /api/v1/adminrole/read`
- `GET /api/v1/adminrole/adminroleids`
- `POST /api/v1/adminrole/save`

- `GET /api/v1/menu/index`

# 强制要求
1. 不再使用 role_ids / rule_ids 逗号字符串作为底层真实存储
2. 使用真正中间表：
   - admin_roles
   - role_rules
3. 兼容旧接口输入/输出语义
4. 实现 NestJS：
   - Roles Decorator
   - Permissions Decorator
   - Guard
5. 菜单树按规则表生成
6. 支持获取：
   - 管理员拥有的角色
   - 角色拥有的规则
   - 当前管理员菜单
7. 管理接口要有权限校验
8. id=1 超级管理员删除限制要兼容保留

# 本轮必须输出
- admins / roles / rules / admin-roles / role-rules / menus 模块代码
- guard / decorator / policy 相关代码
- 旧接口兼容层代码
- 树结构构建逻辑
- `ASSUMPTIONS.md`

现在开始输出第7轮结果。
```

---

# 第8轮：数据迁移脚本

这一轮做旧库迁移。

```markdown
继续第8轮任务：

# 本轮目标
生成完整的数据迁移方案与脚本，实现 MySQL -> PostgreSQL 迁移。

# 必须输出内容
1. 迁移策略说明
2. 旧表 -> 新表映射表
3. 字段映射表
4. 数据清洗规则
5. Prisma migration
6. PostgreSQL SQL
7. MySQL 导出脚本示例
8. Node.js/TypeScript 数据迁移脚本
9. RBAC 拆分脚本：
   - `admin_role.role_ids` -> `admin_roles`
   - `role_rule.rule_ids` -> `role_rules`
10. 回滚策略
11. 灰度迁移策略
12. 校验脚本
13. `scripts/` 目录文件
14. `docs/migration-plan.md`
15. `docs/api-compatibility.md`
16. `ASSUMPTIONS.md`

# 特别要求
1. 密码不能直接迁移成 bcrypt 明文转换
2. 必须采用：
   - 旧 md5 保留兼容校验
   - 登录成功后自动升级 bcrypt
3. 时间字段统一到：
   - `created_at`
   - `updated_at`
4. 对坏数据、空值、非法状态值给出处理方案
5. 给出幂等执行建议

现在开始输出第8轮结果。
```

---

# 第9轮：测试 + 文档 + Docker 交付

最后一轮做交付闭环。

```markdown
继续第9轮任务：

# 本轮目标
补齐测试、文档、运行配置，形成完整可交付项目。

# 必须输出内容
1. 单元测试
2. E2E 测试
3. 鉴权测试
4. 登录兼容 md5 -> bcrypt 升级测试
5. 角色创建测试
6. 物品叠加测试
7. 装备配置事务测试
8. 排行榜排序白名单测试
9. 聊天广播测试
10. WebSocket 鉴权测试
11. `README.md`
12. `.env.example`
13. `docker-compose.yml`
14. `Dockerfile`
15. `prisma/seed.ts`
16. Swagger 使用说明
17. 启动命令
18. 测试命令
19. 部署建议
20. 发布检查清单
21. `ASSUMPTIONS.md`

# 强制要求
- 测试代码必须可运行
- 覆盖核心主流程
- README 必须包括：
  - 本地开发
  - Docker 启动
  - Prisma 初始化
  - Redis / PostgreSQL 配置
  - Swagger 地址
  - 测试运行
  - 迁移说明

现在开始输出第9轮结果。
```

---

# 额外补充：如果你想让 SWE1.6 每轮都“承接上一轮产物”

你可以在每轮提示词最前面加一句：

```markdown
请基于上一轮你已经输出的内容继续，不要推翻既有设计。
如果本轮需要调整上一轮设计，请先列出“变更原因”和“影响范围”，再输出调整后的结果。
```

---

# 额外补充：如果你担心它代码输出太散

可以再加这个统一约束：

```markdown
输出所有代码时请遵循以下要求：
1. 所有文件必须有路径标记
2. 不要省略 import
3. 不要写伪代码
4. 不要用 “此处省略”
5. 如文件较长，也必须给完整代码
6. 优先保证代码可运行，而不是只追求形式完整
```

---

# 我再帮你做一个更实用的投喂顺序建议

## 方式 A：稳妥型
适合你第一次跑

- 第0轮
- 第1轮
- 第2轮
- 你人工审一下数据库设计
- 第3轮
- 第4轮
- 第5轮
- 第6轮
- 第7轮
- 第8轮
- 第9轮

## 方式 B：加速型
适合你已经很清楚方向

- 第0轮
- 第1轮 + 第2轮 合并
- 第3轮
- 第4轮 + 第5轮 合并
- 第6轮
- 第7轮
- 第8轮 + 第9轮 合并

我个人建议你先用 **方式 A**。

---

# 最后，我给你一个非常短的“启动句”

每次新开一轮时，可以先丢一句：

```markdown
沿用上一轮设计，继续当前迁移任务。不要重复背景，不要重写已确认部分，只输出当前轮次要求的内容。
```

---

如果你愿意，我下一条可以继续直接给你这三样：

1. **精简版一键总提示词**
2. **PostgreSQL 表设计初稿**
3. **Prisma Schema 第一版**

你只要回我一句：

**继续，给我 Prisma 第一版**

我就直接往下给。