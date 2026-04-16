# 三国API文档

> **技术栈**：ThinkPHP 5，JWT 鉴权，MySQL
> **Base URL**：`http://{host}/api/`
> **鉴权说明**：需要鉴权的接口须在请求 Header 中携带 `token` 字段（登录后获得的 JWT Token）。
> **通用响应格式**：`{ "code": 0, "msg": "..." }` — code 为 0 表示成功，非 0 表示失败。

---

## 目录

- [一、账号认证（无需鉴权）](#一账号认证无需鉴权)
  - [1.1 注册账号](#11-注册账号)
  - [1.2 登录账号](#12-登录账号)
- [二、版本检测（无需鉴权）](#二版本检测无需鉴权)
  - [2.1 获取最新版本](#21-获取最新版本)
  - [2.2 获取版本列表](#22-获取版本列表)
- [三、游戏主流程（需鉴权）](#三游戏主流程需鉴权)
  - [3.1 选择区服](#31-选择区服)
  - [3.2 创建角色](#32-创建角色)
  - [3.3 进入游戏（选择角色）](#33-进入游戏选择角色)
- [四、角色管理（需鉴权）](#四角色管理需鉴权)
- [五、背包与物品（需鉴权）](#五背包与物品需鉴权)
- [六、副将管理（需鉴权）](#六副将管理需鉴权)
- [七、任务系统（需鉴权）](#七任务系统需鉴权)
- [八、消息系统（需鉴权）](#八消息系统需鉴权)
- [九、区服管理（需鉴权）](#九区服管理需鉴权)
- [十、邀请码管理（需鉴权）](#十邀请码管理需鉴权)
- [十一、版本管理（需鉴权）](#十一版本管理需鉴权)
- [十二、RBAC 权限管理（需鉴权）](#十二rbac-权限管理需鉴权)

---

## 数据库表结构说明

| 表名 | 说明 |
|---|---|
| `admin` | 账号（玩家/管理员），字段：`id`, `username`, `password`(md5), `status`, `zone_id`, `create_time`, `update_time` |
| `zone` | 区服，字段：`id`, `name`, `index`, `status`, `tag`, `player_counts` |
| `character` | 游戏角色，字段：`id`, `admin_id`, `zone_id`, `bag_id`, `name`, `status`, `level`, `exp`, `coin`, `points`, `hp`, `mp`, `hppoint`, `mppoint`, `atkpoint`, `sppoint`, `country`, `job`, `gender`, `head` |
| `bag` | 背包，字段：`id`, `soldiermax`(副将上限,默认10), `battlemax`(出战上限,默认2), `status` |
| `goods` | 背包物品，字段：`id`, `bag_id`, `configid`, `count`, `status`(1=装备中/上阵) |
| `soldier` | 副将，字段：`id`, `character_id`, `config_id`, `status`, `level`, `exp`, `points`, `hp`, `mp`, `hppoint`, `mppoint`, `atkpoint`, `sppoint`, `job`, `country` |
| `task` | 任务，字段：`id`, `character_id`, `configid`, `status` |
| `message` | 聊天消息，字段：`id`, `character_id`, `zone_id`, `content`, `type`, `status`, `create_time` |
| `version` | 版本信息，字段：`id`, `version`, `content`, `create_time` |
| `invite` | 邀请码，字段：`id`, `admin_id`, `invitee_id`, `invitecode`, `status` |
| `role` | RBAC权限角色，字段：`id`, `name`, `status` |
| `rule` | RBAC权限规则，字段：`id`, `name`, `pid`, `url`, `img`, `status` |
| `admin_role` | 管理员-角色关联，字段：`id`, `admin_id`, `role_ids`(逗号分隔) |
| `role_rule` | 角色-规则关联，字段：`id`, `role_id`, `rule_ids`(逗号分隔) |

---

## 一、账号认证（无需鉴权）

### 1.1 注册账号

**接口**：`POST /api/v1/regadmin/index`
**说明**：需要有效邀请码才能注册。注册时自动创建一个背包记录。

**请求参数**：
```json
{
  "username": "test1",
  "password": "123",
  "invitecode": "2025"
}
```

**成功返回**：
```json
{ "code": 0, "msg": "注册成功" }
```

**失败返回**：
```json
{ "code": 1, "msg": "注册失败,邀请码不能为空" }
{ "code": 2, "msg": "注册失败,邀请码不存在" }
{ "code": 3, "msg": "注册失败,账号已存在" }
{ "code": 4, "msg": "注册失败,未知错误001" }
```

---

### 1.2 登录账号

**接口**：`POST /api/login/index`
**说明**：登录成功后返回 JWT Token 和当前开放的区服列表。Token 有效期 365 天，后续请求需在 Header 携带 `token`。

**请求参数**：
```json
{
  "username": "test1",
  "password": "123"
}
```

**成功返回**：
```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "token": "eyJ0eXAiOiJKV1Qi...",
    "zoneList": [
      {
        "id": 1,
        "name": "蛇年大吉",
        "index": 0,
        "status": 1,
        "tag": "新区",
        "player_counts": 0
      }
    ]
  }
}
```

**失败返回**：
```json
{ "code": 1, "msg": "不存在" }
{ "code": 2, "msg": "账号或密码错误" }
{ "code": 3, "msg": "数据错误" }
```

---

## 二、版本检测（无需鉴权）

### 2.1 获取最新版本

**接口**：`GET /api/v1/version/index`
**说明**：返回最新一条版本记录（按 id DESC）。

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取成功",
  "data": {
    "id": 5,
    "version": "1.0.5",
    "content": "更新说明",
    "create_time": "2025-01-15 10:00:00"
  }
}
```

**失败返回**：
```json
{ "code": 1, "msg": "没数据" }
```

---

### 2.2 获取版本列表

**接口**：`GET /api/v1/version/newindex`
**Query 参数**：`limit`（默认1），`page`（默认1）

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取成功",
  "data": [
    { "id": 5, "version": "1.0.5", "content": "更新说明", "create_time": "2025-01-15 10:00:00" }
  ]
}
```

---

## 三、游戏主流程（需鉴权）

> 以下接口均需在请求 Header 中携带：`token: <JWT Token>`

### 3.1 选择区服

**接口**：`POST /api/v1/zone/selzone`
**说明**：选择区服后将该 zone_id 写入当前账号，并返回该账号在此区服下的角色列表。

**请求参数**：
```json
{ "zoneId": 1 }
```

**成功返回**：
```json
{
  "code": 0,
  "msg": "选择区服成功",
  "data": {
    "characterList": [
      {
        "id": 1,
        "name": "我爱三国",
        "status": 1,
        "level": 4,
        "coin": 722,
        "exp": 16,
        "points": 18,
        "hp": 8738,
        "mp": 45,
        "country": 3,
        "job": 2,
        "bag_id": 1
      }
    ]
  }
}
```

**失败返回**：
```json
{ "code": 1, "msg": "区服不能为空" }
{ "code": 2, "msg": "区服错误" }
{ "code": 3, "msg": "选择区服失败" }
```

---

### 3.2 创建角色

**接口**：`POST /api/v1/character/add`
**说明**：为当前账号在指定区服创建角色。自动创建背包并创建默认任务（configid=1001）。

**请求参数**：
```json
{
  "zone_id": 1,
  "name": "三国新人",
  "country": 1,
  "job": 1,
  "gender": 1,
  "head": 1
}
```

**成功返回**：
```json
{
  "code": 0,
  "msg": "角色创建成功",
  "data": {
    "id": 5,
    "name": "三国新人",
    "status": 1,
    "level": 1,
    "coin": 0,
    "exp": 0,
    "points": 4,
    "hp": 10,
    "mp": 5,
    "country": 1,
    "job": 1,
    "bag_id": 3
  }
}
```

**失败返回**：
```json
{ "code": 1, "msg": "角色创建失败,错误001" }
{ "code": 2, "msg": "角色创建失败,错误002" }
{ "code": 3, "msg": "角色创建失败,错误003" }
{ "code": 4, "msg": "任务创建失败,错误004" }
```

---

### 3.3 进入游戏（选择角色）

**接口**：`GET /api/v1/logingame/loginplayersel`
**说明**：选定角色进入游戏，一次性返回该角色的背包物品、副将列表、任务列表。

**Query 参数**：`bag_id=1&character_id=1`

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取角色信息成功",
  "data": {
    "bagItemDatas": [
      { "id": 7, "configid": 3004, "count": 1, "status": 1 }
    ],
    "soldierItemDatas": [
      {
        "id": 10000,
        "character_id": 1,
        "config_id": 1004,
        "status": 1,
        "level": 1,
        "exp": 0,
        "points": 4,
        "hppoint": 0,
        "mppoint": 0,
        "atkpoint": 0,
        "sppoint": 0,
        "hp": 0,
        "mp": 0,
        "job": 1,
        "country": 1
      }
    ],
    "taskItems": [
      { "id": 1, "configid": 1001, "status": 1 }
    ]
  }
}
```

---

## 四、角色管理（需鉴权）

### 4.1 获取角色列表（管理用）

**接口**：`GET /api/v1/character/index`
**Query 参数**：`limit`（默认10），`page`（默认1）

**成功返回**：
```json
{
  "code": 0, "msg": "获取成功",
  "data": [ { "id": 1, "name": "我爱三国", "level": 4, ... } ],
  "count": 4
}
```

---

### 4.2 保存/更新角色

**接口**：`POST /api/v1/character/save`
**说明**：有 `id` 则更新，无 `id` 则新增。

**请求参数（更新示例）**：
```json
{ "id": 1, "coin": 1000, "level": 5 }
```

**返回**：
```json
{ "code": 0, "msg": "操作成功" }
{ "code": 1, "msg": "操作失败" }
```

---

### 4.3 角色属性增量更新

**接口**：`POST /api/v1/character/incsave`
**说明**：使用 `inc_` 前缀字段进行数值增量（支持负数减少）。

**请求参数**：
```json
{
  "id": 1,
  "inc_exp": 100,
  "inc_coin": 50,
  "inc_hp": -10
}
```

---

### 4.4 角色使用属性点

**接口**：`POST /api/v1/character/usepoint`
**说明**：将属性点分配到指定属性，同时自动从 `points` 中扣除对应数量。

**请求参数**：
```json
{ "id": 1, "inc_hppoint": 2, "inc_atkpoint": 1 }
```

**返回**：
```json
{ "code": 0, "msg": "操作成功" }
{ "code": 1, "msg": "操作失败" }
```

---

### 4.5 获取区服排行榜

**接口**：`GET /api/v1/character/getrank`
**Query 参数**：`zoneid`（必填），`limit`（默认10），`page`（默认1），`order`（排序字段，默认 `id ASC`，如 `level` 则按等级降序）

**成功返回**：
```json
{
  "code": 0, "msg": "获取成功",
  "data": [ { "id": 1, "name": "我爱三国", "level": 4, ... } ],
  "count": 4
}
```

---

## 五、背包与物品（需鉴权）

### 5.1 获取背包列表（管理用）

**接口**：`GET /api/v1/bag/index`
**Query 参数**：`limit`（默认10），`page`（默认1）

---

### 5.2 通过背包ID获取物品

**接口**：`GET /api/v1/goods/getbybagid`
**Query 参数**：`bag_id=1`

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取物品信息成功",
  "data": {
    "bagItemDatas": [
      { "id": 7, "configid": 3004, "count": 1, "status": 1 }
    ]
  }
}
```

---

### 5.3 保存/更新物品

**接口**：`POST /api/v1/goods/save`

**请求参数**：
```json
{ "id": 7, "count": 5 }
```

---

### 5.4 物品数量增量更新

**接口**：`POST /api/v1/goods/incsave`

**请求参数**：
```json
{ "id": 7, "inc_count": 3 }
```

---

### 5.5 增加物品（自动合并/新增）

**接口**：`POST /api/v1/goods/incgoods`
**说明**：若物品已存在（同 bag_id+configid）则叠加 count；若 configid 以 `6` 开头（装备类型）则直接插入新记录并返回新 id。

**请求参数**：
```json
{ "bag_id": 1, "configid": 3001, "count": 5 }
```

**成功返回（普通物品）**：
```json
{ "code": 0, "msg": "操作成功" }
```

**成功返回（装备类型，configid 以6开头）**：
```json
{ "code": 0, "msg": "购买新的装备成功", "data": 15 }
```

**失败返回**：
```json
{ "code": 1, "msg": "物品同步服务器失败,错误001" }
```

---

### 5.6 配置装备上阵

**接口**：`POST /api/v1/goods/equipconfig`
**说明**：先将指定背包所有物品 status 设为 0，再将 `upeqids` 中的物品 status 设为 1（上阵）。传空字符串则全部下阵。

**请求参数**：
```json
{ "bag_id": 1, "upeqids": "7,8,9" }
```

**成功返回**：
```json
{ "code": 0, "msg": "装备配置成功" }
```

**失败返回**：
```json
{ "code": 1, "msg": "装备配置失败" }
{ "code": 2, "msg": "装备配置失败" }
```

---

## 六、副将管理（需鉴权）

### 6.1 获取副将列表（管理用）

**接口**：`GET /api/v1/soldier/index`
**Query 参数**：`limit`（默认10），`page`（默认1）

---

### 6.2 通过角色ID获取副将

**接口**：`GET /api/v1/soldier/getbycharacterid`
**Query 参数**：`character_id=1`

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取副将信息成功",
  "data": {
    "soldierItemList": [
      {
        "id": 10000, "character_id": 1, "config_id": 1004,
        "status": 1, "level": 1, "exp": 0, "points": 4,
        "hppoint": 0, "mppoint": 0, "atkpoint": 0, "sppoint": 0,
        "hp": 0, "mp": 0, "job": 1, "country": 1
      }
    ]
  }
}
```

---

### 6.3 保存/新增副将

**接口**：`POST /api/v1/soldier/save`
**说明**：有 `id` 则更新，无 `id` 则插入并返回新记录 id。

**请求参数（新增）**：
```json
{ "character_id": 1, "config_id": 2001, "status": 1 }
```

**成功返回**：
```json
{ "code": 0, "msg": "操作成功", "data": 10003 }
```

---

### 6.4 副将属性增量更新

**接口**：`POST /api/v1/soldier/incsave`

**请求参数**：
```json
{ "id": 10000, "inc_exp": 50, "inc_hp": 100 }
```

---

### 6.5 副将使用属性点

**接口**：`POST /api/v1/soldier/usepoint`
**说明**：将属性点分配到指定属性，同时自动从 `points` 中扣除对应数量。

**请求参数**：
```json
{ "id": 10000, "inc_hppoint": 2 }
```

---

## 七、任务系统（需鉴权）

### 7.1 获取任务列表（管理用）

**接口**：`GET /api/v1/task/index`
**Query 参数**：`limit`（默认10），`page`（默认1）

---

### 7.2 保存/更新任务

**接口**：`POST /api/v1/task/save`
**说明**：有 `id` 则更新任务状态；无 `id` 则创建新任务并返回新 id。

**请求参数（更新）**：
```json
{ "id": 1, "status": 2 }
```

**请求参数（新增）**：
```json
{ "character_id": 1, "configid": 1002, "status": 1 }
```

**成功返回（新增）**：
```json
{ "code": 0, "msg": "任务创建操作成功", "data": 2 }
```

**成功返回（更新）**：
```json
{ "code": 0, "msg": "任务修改操作成功" }
```

**失败返回**：
```json
{ "code": 1, "msg": "任务修改操作失败1" }
{ "code": 2, "msg": "任务创建操作失败2" }
```

---

### 7.3 任务增量更新

**接口**：`POST /api/v1/task/incsave`

**请求参数**：
```json
{ "id": 1, "inc_status": 1 }
```

---

## 八、消息系统（需鉴权）

### 8.1 获取消息列表（管理用）

**接口**：`GET /api/v1/message/index`
**Query 参数**：`limit`（默认10），`page`（默认1）
**说明**：按 create_time DESC 排序，排除 `status` 和 `id` 字段。

---

### 8.2 获取消息列表（含角色信息）

**接口**：`GET /api/v1/message/getlist`
**Query 参数**：`limit`（默认10）
**说明**：message 联表 character，按 create_time DESC 排序。

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取成功",
  "data": [
    {
      "character_id": 1,
      "zone_id": 1,
      "content": "hello",
      "type": 0,
      "create_time": "2025-01-15 09:38:56",
      "head": 1,
      "gender": 1,
      "name": "我爱三国"
    }
  ]
}
```

---

### 8.3 保存消息

**接口**：`POST /api/v1/message/save`

**请求参数**：
```json
{ "character_id": 1, "zone_id": 1, "content": "你好啊", "type": 0 }
```

**返回**：
```json
{ "code": 0, "msg": "操作成功" }
```

---

## 九、区服管理（需鉴权）

### 9.1 获取区服列表

**接口**：`GET /api/v1/zone/index`
**Query 参数**：`limit`（默认10），`page`（默认1）
**返回字段**：`id`, `name`, `index`, `status`, `tag`, `player_counts`

**成功返回**：
```json
{
  "code": 0, "msg": "获取成功",
  "data": [
    { "id": 1, "name": "蛇年大吉", "index": 0, "status": 1, "tag": "新区", "player_counts": 0 }
  ],
  "count": 2
}
```

---

## 十、邀请码管理（需鉴权）

### 10.1 获取邀请码列表

**接口**：`GET /api/v1/invite/index`
**Query 参数**：`limit`（默认10），`page`（默认1）

---

### 10.2 验证邀请码

**接口**：`GET /api/v1/invite/getlistbycode`
**Query 参数**：`invitecode=2025`

**成功返回**：
```json
{ "code": 0, "msg": "有这个邀请码" }
```

**失败返回**：
```json
{ "code": 1, "msg": "没有这个邀请码" }
```

---

### 10.3 保存邀请码

**接口**：`POST /api/v1/invite/save`

**请求参数**：
```json
{ "admin_id": 1, "invitecode": "2026", "status": 1 }
```

---

## 十一、版本管理（需鉴权）

### 11.1 保存版本

**接口**：`POST /api/v1/version/save`

**请求参数**：
```json
{ "version": "1.0.6", "content": "修复若干bug" }
```

**返回**：
```json
{ "code": 0, "msg": "操作成功" }
```

---

## 十二、RBAC 权限管理（需鉴权）

### 12.1 获取管理员列表

**接口**：`GET /api/v1/admin/index`
**Query 参数**：`limit`（默认10），`page`（默认1）
**返回字段**：`id`, `username`, `password`, `status`, `create_time`, `zone_id`

---

### 12.2 保存/更新管理员

**接口**：`POST /api/v1/admin/save`
**说明**：有 `id` 则更新，无 `id` 则新增。密码自动 md5 处理。

**请求参数**：
```json
{ "id": 2, "status": 0 }
```

---

### 12.3 删除管理员

**接口**：`POST /api/v1/admin/delete`
**说明**：id=1 的超级管理员不可删除。

**请求参数**：
```json
{ "id": 3 }
```

---

### 12.4 获取RBAC角色列表

**接口**：`GET /api/v1/role/index`
**Query 参数**：`limit`（默认10），`page`（默认1）

---

### 12.5 保存RBAC角色

**接口**：`POST /api/v1/role/save`

**请求参数**：
```json
{ "name": "运营", "status": 1 }
```

---

### 12.6 删除RBAC角色

**接口**：`POST /api/v1/role/delete`

**请求参数**：
```json
{ "id": 3 }
```

---

### 12.7 获取规则列表

**接口**：`GET /api/v1/rule/index`
**返回字段**：`id`, `name`, `create_time`, `img`, `url`, `status`

---

### 12.8 保存规则

**接口**：`POST /api/v1/rule/save`

**请求参数**：
```json
{ "name": "用户管理", "pid": 0, "url": "/user/index", "img": "icon-user", "status": 1 }
```

---

### 12.9 删除规则

**接口**：`POST /api/v1/rule/delete`

**请求参数**：
```json
{ "id": 5 }
```

---

### 12.10 获取所有规则列表（平铺）

**接口**：`GET /api/v1/rolerule/index`
**说明**：返回所有 status=1 的规则，字段：`id`, `name`, `pid`, `url`, `img`。

---

### 12.11 获取规则树形结构

**接口**：`GET /api/v1/rolerule/gettree`
**说明**：将规则列表转为树形结构，子节点在 `_child` 字段中。

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取规则信息成功",
  "data": [
    {
      "id": 1, "name": "系统管理", "pid": 0, "url": "", "img": "",
      "_child": [
        { "id": 2, "name": "用户管理", "pid": 1, "url": "/user/index", "img": "" }
      ]
    }
  ]
}
```

---

### 12.12 获取角色拥有的规则ID列表

**接口**：`GET /api/v1/rolerule/geturlroleid`
**Query 参数**：`role_id=1`

**成功返回**：
```json
{ "code": 0, "msg": "获取规则信息成功", "data": [1, 2, 3] }
```

---

### 12.13 保存角色-规则关联

**接口**：`POST /api/v1/rolerule/save`
**说明**：存在则更新 `rule_ids`，不存在则新增。

**请求参数**：
```json
{ "role_id": 1, "rule_ids": "1,2,3,4" }
```

---

### 12.14 获取管理员角色列表（含选中状态）

**接口**：`GET /api/v1/adminrole/read`
**Query 参数**：`admin_id=1`
**说明**：返回所有角色，并标记当前管理员已选中的角色（`check: true/false`）。

**成功返回**：
```json
{
  "code": 0,
  "data": [
    { "id": 1, "name": "超级管理员", "check": true },
    { "id": 2, "name": "玩家", "check": false }
  ]
}
```

---

### 12.15 获取管理员的角色ID列表

**接口**：`GET /api/v1/adminrole/adminroleids`
**Query 参数**：`admin_id=1`

**成功返回**：
```json
{ "code": 0, "msg": "获取admin下的roleids成功", "data": [1] }
```

**失败返回**：
```json
{ "code": 1, "msg": "获取admin下的roleids为空", "data": "" }
```

---

### 12.16 保存管理员-角色关联

**接口**：`POST /api/v1/adminrole/save`
**说明**：存在则更新 `role_ids`，不存在则新增。

**请求参数**：
```json
{ "admin_id": 2, "role_ids": "1,2" }
```

---

### 12.17 获取当前管理员菜单

**接口**：`GET /api/v1/menu/index`
**说明**：根据当前登录账号的角色，查询其拥有的所有规则，以树形结构返回菜单。

**成功返回**：
```json
{
  "code": 0,
  "msg": "获取菜单成功",
  "data": [
    {
      "id": 1, "name": "系统管理", "pid": 0,
      "_child": [
        { "id": 2, "name": "用户管理", "pid": 1, "url": "/user/index" }
      ]
    }
  ]
}
```
