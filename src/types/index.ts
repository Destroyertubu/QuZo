// ==================== 地块类型 ====================

/**
 * 地块类型枚举
 */
export enum LandType {
  FARMLAND = 'farmland',      // 农田
  HOMESTEAD = 'homestead'      // 宅基地
}

/**
 * 地块基础信息
 */
export interface LandPlot {
  id: string;                   // 地块ID
  householdId?: string;         // 所属户ID
  name?: string;                // 地块名称
  type: LandType;               // 地块类型
  coordinates: Coordinate[];    // 地块坐标点集合（用于绘制多边形）
  area: number;                 // 面积（平方米）
  color?: string;               // 颜色
}

/**
 * 坐标点（经纬度）
 */
export interface Coordinate {
  lng: number;  // 经度
  lat: number;  // 纬度
}

// ==================== 农田信息 ====================

/**
 * 农田详细信息
 */
export interface FarmlandDetail {
  id: string;                   // 农田ID
  householdId: string;          // 所属户ID
  householdName: string;        // 户主姓名
  plantingInfo: string;         // 种植信息
  crops: string;                // 种植作物
  landType: string;             // 土地类型（水田、旱地等）
  subsidy: number;              // 补贴金额（元）
  yield: number;                // 产量（公斤）
  area: number;                 // 面积（平方米）
}

// ==================== 宅基地信息 ====================

/**
 * 宅基地详细信息
 */
export interface HomesteadDetail {
  id: string;                   // 宅基地ID
  householdId: string;          // 户ID
  householdName: string;        // 户主姓名
  population: number;           // 家庭人口数
  education: string;            // 学历情况
  hasSubsistenceAllowance: boolean;  // 是否享受低保
  hasFiveGuarantees: boolean;   // 是否五保户
  isWorkingOutside: boolean;    // 是否外出打工
  religion: string;             // 宗教情况
  area: number;                 // 宅基地面积（平方米）
}

// ==================== 村民信息 ====================

/**
 * 家庭成员信息（移除敏感信息）
 */
export interface HouseholdMember {
  name: string;                 // 姓名
  relationship: string;         // 与户主关系
  note: string | null;          // 备注（如党员等）
}

/**
 * 户籍信息
 */
export interface Household {
  id: string;                   // 户ID
  householder: string;          // 户主姓名
  surname: string;              // 姓氏
  members: HouseholdMember[];   // 家庭成员列表
  totalMembers: number;         // 总人口数
  partyMembers: number;         // 党员数
}

/**
 * 村民基本信息（移除敏感信息）
 */
export interface VillagerInfo {
  id: string;                   // 村民ID
  householdId: string;          // 户ID
  householdNumber?: number;     // 户号
  name: string;                 // 姓名
  memberCount?: number;         // 家庭人口数
  members?: HouseholdMember[];  // 家庭成员列表
  farmlandArea: number;         // 农田面积（平方米）
  homesteadArea: number;        // 宅基地面积（平方米）
  farmlandCount: number;        // 农田地块数量
  homesteadCount: number;       // 宅基地地块数量
}

// ==================== 统计数据 ====================

/**
 * 姓氏分布
 */
export interface SurnameDistribution {
  surname: string;
  count: number;
}

/**
 * 村庄统计数据（用于左侧图表）
 */
export interface VillageStatistics {
  totalPopulation: number;      // 总人口
  totalHouseholds: number;      // 总户数
  totalPartyMembers: number;    // 党员数
  totalLandPlots: number;       // 大地块数
  totalHomesteads: number;      // 宅基地数
  totalHomesteadArea: string;   // 宅基地总面积
  totalFarmlandArea?: number;   // 农田总面积
  totalSubsidy?: number;        // 补贴总金额
  totalYield?: number;          // 总产量
  surnameDistribution: SurnameDistribution[];  // 姓氏分布
  cropDistribution?: {          // 作物分布
    [cropName: string]: number; // 作物名 -> 面积
  };
  educationDistribution?: {     // 学历分布
    [education: string]: number; // 学历 -> 人数
  };
}

// ==================== 菜单和UI ====================

/**
 * 菜单项
 */
export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
}

/**
 * 详情窗口类型
 */
export type DetailType =
  | 'household'
  | 'landPlot'
  | 'homestead'
  | 'statistics'
  | 'surname'
  | 'population'
  | 'chart'
  | 'village-history'
  | 'organization'
  | 'land-overview'
  | 'crop-distribution'
  | 'party-members'
  | 'industry-overview'
  | 'agriculture'
  | 'economy'
  | null;

/**
 * 图表类型
 */
export type ChartType =
  | 'surname-bar'
  | 'surname-pie'
  | 'age-distribution'
  | 'population-trend'
  | 'homestead-area';

/**
 * 详情窗口数据
 */
export interface DetailWindowData {
  type: DetailType;
  title: string;
  data: any;
}

// ==================== API 响应类型 ====================

/**
 * 统一响应格式
 */
export interface ApiResponse<T> {
  code: number;                 // 状态码：200 成功，其他失败
  message: string;              // 响应消息
  data: T;                      // 响应数据
}

/**
 * 分页参数
 */
export interface PageParams {
  page: number;                 // 页码（从1开始）
  pageSize: number;             // 每页大小
}

/**
 * 分页响应
 */
export interface PageResponse<T> {
  list: T[];                    // 数据列表
  total: number;                // 总数
  page: number;                 // 当前页
  pageSize: number;             // 每页大小
}