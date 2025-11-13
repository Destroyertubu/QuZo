# 后端 API 接口规范文档

## 概述

本文档定义了村庄土地管理系统的后端 API 接口规范。前端通过这些接口与后端进行数据交互。

## 基础信息

- **协议**: HTTP/HTTPS
- **基础 URL**: `http://localhost:8080/api`
- **数据格式**: JSON
- **字符编码**: UTF-8
- **请求头**: `Content-Type: application/json`

## 统一响应格式

所有接口返回统一的响应格式：

```typescript
{
  "code": number,      // 状态码
  "message": string,   // 响应消息
  "data": any         // 响应数据
}
```

### 状态码说明

| 状态码 | 说明 | 示例场景 |
|-------|------|---------|
| 200 | 成功 | 请求处理成功 |
| 400 | 客户端错误 | 参数错误、缺少必填参数 |
| 401 | 未授权 | Token 失效、未登录 |
| 403 | 禁止访问 | 无权限访问 |
| 404 | 资源不存在 | 请求的资源不存在 |
| 500 | 服务器错误 | 服务器内部错误 |

## 接口列表

### 1. 获取村庄统计数据

获取村庄整体统计信息，用于首页左侧统计面板展示。

**基本信息**

- **接口地址**: `/api/statistics`
- **请求方式**: GET
- **是否需要认证**: 否

**请求参数**: 无

**响应数据**

```typescript
interface VillageStatistics {
  totalPopulation: number;      // 总人口数
  totalHouseholds: number;      // 总户数
  totalFarmlandArea: number;    // 农田总面积（平方米）
  totalHomesteadArea: number;   // 宅基地总面积（平方米）
  totalSubsidy: number;         // 补贴总金额（元）
  totalYield: number;           // 总产量（公斤）
  cropDistribution: {           // 作物分布（作物名 -> 面积）
    [cropName: string]: number;
  };
  educationDistribution: {      // 学历分布（学历 -> 人数）
    [education: string]: number;
  };
}
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalPopulation": 1250,
    "totalHouseholds": 320,
    "totalFarmlandArea": 450000,
    "totalHomesteadArea": 32000,
    "totalSubsidy": 125000,
    "totalYield": 675000,
    "cropDistribution": {
      "水稻": 180000,
      "小麦": 120000,
      "玉米": 80000,
      "蔬菜": 50000,
      "其他": 20000
    },
    "educationDistribution": {
      "小学": 350,
      "初中": 420,
      "高中": 280,
      "大专": 120,
      "本科及以上": 80
    }
  }
}
```

---

### 2. 获取所有地块数据

获取所有地块的坐标和基本信息，用于中间地图可视化展示。

**基本信息**

- **接口地址**: `/api/land-plots`
- **请求方式**: GET
- **是否需要认证**: 否

**请求参数**: 无

**响应数据**

```typescript
interface LandPlot {
  id: string;                   // 地块ID
  householdId: string;          // 所属户ID
  type: 'farmland' | 'homestead'; // 地块类型：farmland-农田，homestead-宅基地
  coordinates: {                // 地块坐标点集合（用于绘制多边形）
    x: number;
    y: number;
  }[];
  area: number;                 // 面积（平方米）
}
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "farm-001",
      "householdId": "household-001",
      "type": "farmland",
      "coordinates": [
        { "x": 100, "y": 100 },
        { "x": 200, "y": 100 },
        { "x": 200, "y": 200 },
        { "x": 100, "y": 200 }
      ],
      "area": 1000
    },
    {
      "id": "home-001",
      "householdId": "household-001",
      "type": "homestead",
      "coordinates": [
        { "x": 350, "y": 250 },
        { "x": 400, "y": 250 },
        { "x": 400, "y": 300 },
        { "x": 350, "y": 300 }
      ],
      "area": 100
    }
  ]
}
```

**说明**:
- `coordinates` 数组定义地块的多边形顶点，按顺序连接形成封闭多边形
- 坐标系原点在左上角，向右为 X 轴正方向，向下为 Y 轴正方向
- 建议坐标范围：X: 0-800, Y: 0-600（Canvas 尺寸）

---

### 3. 获取村民列表（分页）

获取村民基本信息列表，用于右侧村民列表展示。

**基本信息**

- **接口地址**: `/api/villagers`
- **请求方式**: GET
- **是否需要认证**: 否

**请求参数**

| 参数名 | 类型 | 必填 | 说明 | 默认值 |
|-------|------|------|------|--------|
| page | number | 是 | 页码（从1开始） | - |
| pageSize | number | 是 | 每页大小 | - |

**请求示例**

```
GET /api/villagers?page=1&pageSize=10
```

**响应数据**

```typescript
interface PageResponse<T> {
  list: T[];       // 数据列表
  total: number;   // 总数
  page: number;    // 当前页
  pageSize: number; // 每页大小
}

interface VillagerInfo {
  id: string;              // 村民ID
  householdId: string;     // 户ID
  name: string;            // 姓名
  idCard: string;          // 身份证号（脱敏）
  phone: string;           // 联系电话（脱敏）
  farmlandArea: number;    // 农田面积（平方米）
  homesteadArea: number;   // 宅基地面积（平方米）
  farmlandCount: number;   // 农田地块数量
  homesteadCount: number;  // 宅基地地块数量
}
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "villager-001",
        "householdId": "household-001",
        "name": "张三",
        "idCard": "320123********1234",
        "phone": "138****1234",
        "farmlandArea": 1000,
        "homesteadArea": 100,
        "farmlandCount": 1,
        "homesteadCount": 1
      },
      {
        "id": "villager-002",
        "householdId": "household-002",
        "name": "李四",
        "idCard": "320123********5678",
        "phone": "139****5678",
        "farmlandArea": 800,
        "homesteadArea": 100,
        "farmlandCount": 1,
        "homesteadCount": 1
      }
    ],
    "total": 320,
    "page": 1,
    "pageSize": 10
  }
}
```

---

### 4. 获取农田详情

根据地块 ID 获取农田的详细信息。

**基本信息**

- **接口地址**: `/api/farmland/:id`
- **请求方式**: GET
- **是否需要认证**: 否

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| id | string | 是 | 农田地块ID |

**请求示例**

```
GET /api/farmland/farm-001
```

**响应数据**

```typescript
interface FarmlandDetail {
  id: string;              // 农田ID
  householdId: string;     // 所属户ID
  householdName: string;   // 户主姓名
  plantingInfo: string;    // 种植信息
  crops: string;           // 种植作物
  landType: string;        // 土地类型（水田、旱地等）
  subsidy: number;         // 补贴金额（元）
  yield: number;           // 产量（公斤）
  area: number;            // 面积（平方米）
}
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "farm-001",
    "householdId": "household-001",
    "householdName": "张三",
    "plantingInfo": "2024年春季种植",
    "crops": "水稻",
    "landType": "水田",
    "subsidy": 1200,
    "yield": 750,
    "area": 1000
  }
}
```

**错误响应**

```json
{
  "code": 404,
  "message": "农田信息不存在",
  "data": null
}
```

---

### 5. 获取宅基地详情

根据地块 ID 获取宅基地的详细信息。

**基本信息**

- **接口地址**: `/api/homestead/:id`
- **请求方式**: GET
- **是否需要认证**: 否

**路径参数**

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| id | string | 是 | 宅基地地块ID |

**请求示例**

```
GET /api/homestead/home-001
```

**响应数据**

```typescript
interface HomesteadDetail {
  id: string;                      // 宅基地ID
  householdId: string;             // 户ID
  householdName: string;           // 户主姓名
  population: number;              // 家庭人口数
  education: string;               // 学历情况
  hasSubsistenceAllowance: boolean; // 是否享受低保
  hasFiveGuarantees: boolean;      // 是否五保户
  isWorkingOutside: boolean;       // 是否外出打工
  religion: string;                // 宗教情况
  area: number;                    // 宅基地面积（平方米）
}
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "home-001",
    "householdId": "household-001",
    "householdName": "张三",
    "population": 4,
    "education": "户主：本科，配偶：高中",
    "hasSubsistenceAllowance": false,
    "hasFiveGuarantees": false,
    "isWorkingOutside": true,
    "religion": "无",
    "area": 100
  }
}
```

**错误响应**

```json
{
  "code": 404,
  "message": "宅基地信息不存在",
  "data": null
}
```

---

### 6. 搜索村民

根据关键词搜索村民信息。

**基本信息**

- **接口地址**: `/api/villagers/search`
- **请求方式**: GET
- **是否需要认证**: 否

**请求参数**

| 参数名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| keyword | string | 是 | 搜索关键词（姓名或身份证号） |

**请求示例**

```
GET /api/villagers/search?keyword=张三
```

**响应数据**

```typescript
VillagerInfo[] // 村民信息数组
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "villager-001",
      "householdId": "household-001",
      "name": "张三",
      "idCard": "320123********1234",
      "phone": "138****1234",
      "farmlandArea": 1000,
      "homesteadArea": 100,
      "farmlandCount": 1,
      "homesteadCount": 1
    }
  ]
}
```

---

## 错误处理

### 通用错误响应

```json
{
  "code": 400,
  "message": "参数错误：page 必须大于 0",
  "data": null
}
```

### 常见错误码

| 错误码 | 说明 | 处理方式 |
|-------|------|---------|
| 400 | 参数错误 | 检查请求参数是否正确 |
| 401 | 未授权 | 重新登录获取 Token |
| 404 | 资源不存在 | 检查请求的资源 ID 是否正确 |
| 500 | 服务器错误 | 联系后端开发人员 |

---

## 数据字典

### 地块类型（LandType）

| 值 | 说明 | 地图显示颜色 |
|----|------|-------------|
| farmland | 农田 | 红色 (#ff4d4f) |
| homestead | 宅基地 | 蓝色 (#1890ff) |

### 土地类型（农田）

- 水田
- 旱地
- 梯田
- 林地

### 学历类型

- 小学
- 初中
- 高中
- 中专
- 大专
- 本科
- 硕士
- 博士

### 宗教类型

- 无
- 佛教
- 道教
- 基督教
- 伊斯兰教
- 其他

---

## 开发指南

### 跨域配置

前端开发环境使用代理解决跨域问题（已在 `vite.config.ts` 配置）：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

生产环境需要后端配置 CORS：

```java
// Spring Boot 示例
@CrossOrigin(origins = "*")
```

### 认证方式（可选）

如需要添加认证，建议使用 JWT Token：

1. 登录接口返回 Token
2. 前端存储在 localStorage
3. 后续请求在 Header 中携带：`Authorization: Bearer <token>`

前端已在 `src/services/api.ts` 预留了 Token 添加位置（已注释）。

### 数据脱敏

敏感信息需要在后端进行脱敏处理：

- **身份证号**: 保留前6位和后4位，中间用 `*` 替代
  - 示例: `320123********1234`
- **手机号**: 保留前3位和后4位，中间用 `*` 替代
  - 示例: `138****1234`

---

## 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2024-10-28 | 初始版本 |

---

## 联系方式

如有疑问或建议，请联系：
- 前端团队
- 后端团队