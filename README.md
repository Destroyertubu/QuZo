# 村庄土地管理系统

基于 React + TypeScript + Ant Design 实现的村庄土地管理可视化系统。

## 功能特性

### 主界面（前端1）
- **左侧统计面板**：展示村庄总体统计数据（人口、户数、土地面积等）和图表
- **中间地块地图**：可视化展示农田（红色）和宅基地（蓝色），支持点击查看详情
- **右侧村民列表**：展示村民基本信息，支持搜索

### 详情弹窗（前端2）
- **农田详情**：种植信息、作物、土地类型、补贴、产量等
- **宅基地详情**：人口、学历、低保、五保、外出打工情况、宗教信息等

## 技术栈

- **前端框架**：React 18 + TypeScript
- **UI 组件库**：Ant Design 5
- **构建工具**：Vite
- **HTTP 客户端**：Axios
- **地图绘制**：Canvas API

## 项目结构

```
QuZo/
├── src/
│   ├── components/          # 组件目录
│   │   ├── StatisticsPanel.tsx    # 左侧统计面板
│   │   ├── StatisticsPanel.css
│   │   ├── LandMap.tsx            # 中间地图
│   │   ├── LandMap.css
│   │   ├── VillagerList.tsx       # 右侧村民列表
│   │   ├── VillagerList.css
│   │   ├── FarmlandModal.tsx      # 农田详情弹窗
│   │   ├── HomesteadModal.tsx     # 宅基地详情弹窗
│   │   └── DetailModal.css        # 详情弹窗通用样式
│   ├── services/           # 服务层
│   │   ├── api.ts                 # API 接口定义
│   │   └── mockData.ts            # 模拟数据
│   ├── types/              # 类型定义
│   │   └── index.ts               # TypeScript 类型
│   ├── App.tsx             # 主应用组件
│   ├── App.css
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 4. 预览生产构建

```bash
npm run preview
```

## 后端接口规范

### 基础配置

- **Base URL**: `http://localhost:8080/api`
- **请求头**: `Content-Type: application/json`
- **统一响应格式**:

```typescript
{
  "code": 200,           // 状态码：200-成功，400-客户端错误，500-服务器错误
  "message": "success",  // 响应消息
  "data": {}            // 响应数据
}
```

### API 接口列表

#### 1. 获取村庄统计数据

**接口**: `GET /api/statistics`

**描述**: 获取村庄总体统计信息，用于左侧图表展示

**响应示例**:
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
      "玉米": 80000
    },
    "educationDistribution": {
      "小学": 350,
      "初中": 420,
      "高中": 280
    }
  }
}
```

#### 2. 获取所有地块数据

**接口**: `GET /api/land-plots`

**描述**: 获取所有地块的坐标和基本信息，用于中间地图绘制

**响应示例**:
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
    }
  ]
}
```

#### 3. 获取村民列表（分页）

**接口**: `GET /api/villagers?page=1&pageSize=10`

**描述**: 获取分页的村民信息列表，用于右侧列表展示

**请求参数**:
- `page` (number): 页码，从 1 开始
- `pageSize` (number): 每页大小

**响应示例**:
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
      }
    ],
    "total": 320,
    "page": 1,
    "pageSize": 10
  }
}
```

#### 4. 获取农田详情

**接口**: `GET /api/farmland/:id`

**描述**: 根据地块 ID 获取农田详细信息

**路径参数**:
- `id` (string): 农田地块 ID

**响应示例**:
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

#### 5. 获取宅基地详情

**接口**: `GET /api/homestead/:id`

**描述**: 根据地块 ID 获取宅基地详细信息

**路径参数**:
- `id` (string): 宅基地地块 ID

**响应示例**:
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

#### 6. 搜索村民

**接口**: `GET /api/villagers/search?keyword=张三`

**描述**: 根据关键词搜索村民

**请求参数**:
- `keyword` (string): 搜索关键词（姓名或身份证号）

**响应示例**:
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

## 数据类型定义

完整的 TypeScript 类型定义请查看 `src/types/index.ts` 文件。

主要类型包括：
- `VillageStatistics`: 村庄统计数据
- `LandPlot`: 地块信息
- `VillagerInfo`: 村民信息
- `FarmlandDetail`: 农田详情
- `HomesteadDetail`: 宅基地详情

## 模拟数据

当前项目使用模拟数据进行开发和测试，数据文件位于 `src/services/mockData.ts`。

要切换到真实后端 API：
1. 确保后端服务运行在 `http://localhost:8080`
2. 在 `src/App.tsx` 中取消注释 API 调用代码
3. 注释掉模拟数据的使用

```typescript
// 使用真实 API
const statsRes = await getVillageStatistics();
const plotsRes = await getLandPlots();
const villagersRes = await getVillagers({ page: 1, pageSize: 100 });

setStatistics(statsRes.data);
setLandPlots(plotsRes.data);
setVillagers(villagersRes.data.list);

// 注释掉模拟数据
// setStatistics(mockStatistics);
// setLandPlots(mockLandPlots);
// setVillagers(mockVillagers);
```

## 开发说明

### 添加新的地块

在 `src/services/mockData.ts` 中的 `mockLandPlots` 数组添加新的地块数据：

```typescript
{
  id: 'farm-004',
  householdId: 'household-004',
  type: 'farmland' as LandType,
  coordinates: [
    { x: 340, y: 100 },
    { x: 440, y: 100 },
    { x: 440, y: 200 },
    { x: 340, y: 200 }
  ],
  area: 1000
}
```

### 自定义样式

主要样式文件：
- `src/index.css`: 全局样式
- `src/App.css`: 主布局样式
- `src/components/*.css`: 各组件样式

### 地图交互

地块地图使用 Canvas 绘制，支持：
- 鼠标悬停高亮
- 点击地块弹出详情
- 自适应容器大小

修改地图样式可编辑 `src/components/LandMap.tsx` 中的绘制逻辑。

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系开发团队。