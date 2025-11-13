import type {
  VillageStatistics,
  LandPlot,
  VillagerInfo,
  FarmlandDetail,
  HomesteadDetail
} from '../types';
import { xihedaoLandPlots } from './csvParser';

/**
 * 虚构村庄统计数据
 * 用于演示的模拟数据
 */
export const mockStatistics: VillageStatistics = {
  totalPopulation: 120,          // 总人口120人
  totalHouseholds: 35,           // 总户数35户
  totalFarmlandArea: 398000,     // 农田总面积约597亩
  totalHomesteadArea: 3850,      // 宅基地总面积约5.8亩
  totalSubsidy: 85000,           // 总补贴约8.5万元
  totalYield: 358000,            // 总产量约358吨
  cropDistribution: {
    '小麦': 159200,              // 小麦约239亩
    '玉米': 119400,              // 玉米约179亩
    '大豆': 59700,               // 大豆约90亩
    '花生': 39800,               // 花生约60亩
    '其他': 19900                // 其他约30亩
  },
  educationDistribution: {
    '小学': 25,
    '初中': 42,
    '高中': 35,
    '大专': 12,
    '本科及以上': 6
  }
};

/**
 * 地块数据
 * 西河道村农田地块
 * 中心点约在: 114.9218, 36.6868 (大河道乡,河北省邯郸市曲周县)
 */
export const mockLandPlots: LandPlot[] = xihedaoLandPlots;

/**
 * 虚构村民信息列表
 * 用于演示的模拟数据
 */
export const mockVillagers: VillagerInfo[] = [
  {
    id: 'villager-001',
    householdId: 'household-1',
    householdNumber: 1,
    name: '张明远',
    idCard: '410182198503152156',
    phone: '138****1234',
    farmlandArea: 65000,
    homesteadArea: 110,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 4,
    members: [
      { name: '张明远', relationship: '户主', idCard: '410182198503152156', phone: '138****1234', note: null },
      { name: '李秀芳', relationship: '妻', idCard: '410182198705231847', phone: '139****5678', note: null },
      { name: '张小华', relationship: '女', idCard: '410182201205182349', phone: null, note: null },
      { name: '张小龙', relationship: '子', idCard: '410182201408122431', phone: null, note: null }
    ]
  },
  {
    id: 'villager-002',
    householdId: 'household-2',
    householdNumber: 2,
    name: '王建国',
    idCard: '410182197808223712',
    phone: '136****2468',
    farmlandArea: 96000,
    homesteadArea: 115,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 5,
    members: [
      { name: '王建国', relationship: '户主', idCard: '410182197808223712', phone: '136****2468', note: '党员' },
      { name: '刘美玲', relationship: '妻', idCard: '410182198009142283', phone: '135****7890', note: null },
      { name: '王志强', relationship: '子', idCard: '410182200503281456', phone: '137****3456', note: null },
      { name: '赵晓晓', relationship: '儿媳', idCard: '410182200606152748', phone: '138****6789', note: null },
      { name: '王小宝', relationship: '孙', idCard: '410182202010052912', phone: null, note: null }
    ]
  },
  {
    id: 'villager-003',
    householdId: 'household-3',
    householdNumber: 3,
    name: '李国强',
    idCard: '410182198201155634',
    phone: '139****3690',
    farmlandArea: 48000,
    homesteadArea: 105,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 3,
    members: [
      { name: '李国强', relationship: '户主', idCard: '410182198201155634', phone: '139****3690', note: null },
      { name: '陈丽华', relationship: '妻', idCard: '410182198405201923', phone: '138****4567', note: null },
      { name: '李明明', relationship: '子', idCard: '410182201009122156', phone: null, note: null }
    ]
  },
  {
    id: 'villager-004',
    householdId: 'household-4',
    householdNumber: 4,
    name: '赵德华',
    idCard: '410182196512082817',
    phone: '137****5678',
    farmlandArea: 22000,
    homesteadArea: 100,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 2,
    members: [
      { name: '赵德华', relationship: '户主', idCard: '410182196512082817', phone: '137****5678', note: null },
      { name: '孙玉兰', relationship: '妻', idCard: '410182196803253428', phone: '136****8901', note: null }
    ]
  },
  {
    id: 'villager-005',
    householdId: 'household-5',
    householdNumber: 5,
    name: '孙文斌',
    idCard: '410182199006141732',
    phone: '158****7890',
    farmlandArea: 19000,
    homesteadArea: 98,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 4,
    members: [
      { name: '孙文斌', relationship: '户主', idCard: '410182199006141732', phone: '158****7890', note: null },
      { name: '马小红', relationship: '妻', idCard: '410182199108252643', phone: '157****2345', note: null },
      { name: '孙佳欣', relationship: '女', idCard: '410182201504032814', phone: null, note: null },
      { name: '孙浩宇', relationship: '子', idCard: '410182201708193625', phone: null, note: null }
    ]
  },
  {
    id: 'villager-006',
    householdId: 'household-6',
    householdNumber: 6,
    name: '周永强',
    idCard: '410182198709253819',
    phone: '150****1234',
    farmlandArea: 14000,
    homesteadArea: 102,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 3,
    members: [
      { name: '周永强', relationship: '户主', idCard: '410182198709253819', phone: '150****1234', note: null },
      { name: '吴秀英', relationship: '妻', idCard: '410182198902143947', phone: '151****5678', note: null },
      { name: '周思思', relationship: '女', idCard: '410182201306251528', phone: null, note: null }
    ]
  },
  {
    id: 'villager-007',
    householdId: 'household-7',
    householdNumber: 7,
    name: '吴建华',
    idCard: '410182197503092145',
    phone: '139****6789',
    farmlandArea: 15000,
    homesteadArea: 108,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 5,
    members: [
      { name: '吴建华', relationship: '户主', idCard: '410182197503092145', phone: '139****6789', note: '党员' },
      { name: '郑玉梅', relationship: '妻', idCard: '410182197605142356', phone: '138****3456', note: null },
      { name: '吴刚', relationship: '子', idCard: '410182200201183427', phone: '137****6789', note: null },
      { name: '何丽丽', relationship: '儿媳', idCard: '410182200304202538', phone: null, note: null },
      { name: '吴欣欣', relationship: '孙女', idCard: '410182202112053649', phone: null, note: null }
    ]
  },
  {
    id: 'villager-008',
    householdId: 'household-8',
    householdNumber: 8,
    name: '郑建军',
    idCard: '410182198805163928',
    phone: '156****2345',
    farmlandArea: 16500,
    homesteadArea: 95,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 4,
    members: [
      { name: '郑建军', relationship: '户主', idCard: '410182198805163928', phone: '156****2345', note: null },
      { name: '田芳芳', relationship: '妻', idCard: '410182199007214139', phone: '155****6789', note: null },
      { name: '郑宇航', relationship: '子', idCard: '410182201503122340', phone: null, note: null },
      { name: '郑梦琪', relationship: '女', idCard: '410182201809183451', phone: null, note: null }
    ]
  },
  {
    id: 'villager-009',
    householdId: 'household-9',
    householdNumber: 9,
    name: '何志勇',
    idCard: '410182196808234521',
    phone: '188****3456',
    farmlandArea: 7000,
    homesteadArea: 92,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 2,
    members: [
      { name: '何志勇', relationship: '户主', idCard: '410182196808234521', phone: '188****3456', note: null },
      { name: '冯淑珍', relationship: '妻', idCard: '410182197010285632', phone: '187****7890', note: null }
    ]
  },
  {
    id: 'villager-010',
    householdId: 'household-10',
    householdNumber: 10,
    name: '马文涛',
    idCard: '410182199203144723',
    phone: '159****4567',
    farmlandArea: 12500,
    homesteadArea: 103,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 3,
    members: [
      { name: '马文涛', relationship: '户主', idCard: '410182199203144723', phone: '159****4567', note: null },
      { name: '林晓燕', relationship: '妻', idCard: '410182199405193834', phone: '158****8901', note: null },
      { name: '马诗雨', relationship: '女', idCard: '410182201707254945', phone: null, note: null }
    ]
  },
  {
    id: 'villager-011',
    householdId: 'household-11',
    householdNumber: 11,
    name: '刘志刚',
    idCard: '410182197012253025',
    phone: '135****6789',
    farmlandArea: 18000,
    homesteadArea: 107,
    farmlandCount: 1,
    homesteadCount: 1,
    memberCount: 4,
    members: [
      { name: '刘志刚', relationship: '户主', idCard: '410182197012253025', phone: '135****6789', note: null },
      { name: '黄秀兰', relationship: '妻', idCard: '410182197202143136', phone: '136****7890', note: null },
      { name: '刘洋', relationship: '子', idCard: '410182199809122247', phone: '137****8901', note: null },
      { name: '刘婷婷', relationship: '女', idCard: '410182200105143358', phone: null, note: null }
    ]
  }
];

/**
 * 虚构农田详情数据
 */
export const mockFarmlandDetails: Record<string, FarmlandDetail> = {
  'plot-1': {
    id: 'plot-1',
    householdId: 'household-1',
    householdName: '张明远',
    plantingInfo: '2024年春季种植',
    crops: '小麦',
    landType: '水浇地',
    subsidy: 8500,
    yield: 5200,
    area: xihedaoLandPlots.find(p => p.id === 'plot-1')?.area || 65000
  },
  'plot-2': {
    id: 'plot-2',
    householdId: 'household-2',
    householdName: '王建国',
    plantingInfo: '2024年春季种植',
    crops: '玉米',
    landType: '水浇地',
    subsidy: 12000,
    yield: 8500,
    area: xihedaoLandPlots.find(p => p.id === 'plot-2')?.area || 96000
  },
  'plot-3': {
    id: 'plot-3',
    householdId: 'household-3',
    householdName: '李国强',
    plantingInfo: '2024年春季种植',
    crops: '小麦、玉米轮作',
    landType: '水浇地',
    subsidy: 6200,
    yield: 4100,
    area: xihedaoLandPlots.find(p => p.id === 'plot-3')?.area || 48000
  },
  'plot-4': {
    id: 'plot-4',
    householdId: 'household-4',
    householdName: '赵德华',
    plantingInfo: '2024年春季种植',
    crops: '大豆',
    landType: '水浇地',
    subsidy: 2800,
    yield: 1800,
    area: xihedaoLandPlots.find(p => p.id === 'plot-4')?.area || 22000
  },
  'plot-5': {
    id: 'plot-5',
    householdId: 'household-5',
    householdName: '孙文斌',
    plantingInfo: '2024年春季种植',
    crops: '小麦',
    landType: '水浇地',
    subsidy: 2500,
    yield: 1600,
    area: xihedaoLandPlots.find(p => p.id === 'plot-5')?.area || 19000
  },
  'plot-6': {
    id: 'plot-6',
    householdId: 'household-6',
    householdName: '周永强',
    plantingInfo: '2024年春季种植',
    crops: '玉米',
    landType: '水浇地',
    subsidy: 1800,
    yield: 1300,
    area: xihedaoLandPlots.find(p => p.id === 'plot-6')?.area || 14000
  },
  'plot-7': {
    id: 'plot-7',
    householdId: 'household-7',
    householdName: '吴建华',
    plantingInfo: '2024年春季种植',
    crops: '小麦',
    landType: '水浇地',
    subsidy: 1900,
    yield: 1400,
    area: xihedaoLandPlots.find(p => p.id === 'plot-7')?.area || 15000
  },
  'plot-8': {
    id: 'plot-8',
    householdId: 'household-8',
    householdName: '郑建军',
    plantingInfo: '2024年春季种植',
    crops: '玉米',
    landType: '水浇地',
    subsidy: 2100,
    yield: 1550,
    area: xihedaoLandPlots.find(p => p.id === 'plot-8')?.area || 16500
  },
  'plot-9': {
    id: 'plot-9',
    householdId: 'household-9',
    householdName: '何志勇',
    plantingInfo: '2024年春季种植',
    crops: '小麦',
    landType: '水浇地',
    subsidy: 900,
    yield: 650,
    area: xihedaoLandPlots.find(p => p.id === 'plot-9')?.area || 7000
  },
  'plot-10': {
    id: 'plot-10',
    householdId: 'household-10',
    householdName: '马文涛',
    plantingInfo: '2024年春季种植',
    crops: '大豆',
    landType: '水浇地',
    subsidy: 1600,
    yield: 1100,
    area: xihedaoLandPlots.find(p => p.id === 'plot-10')?.area || 12500
  },
  'plot-11': {
    id: 'plot-11',
    householdId: 'household-11',
    householdName: '刘志刚',
    plantingInfo: '2024年春季种植',
    crops: '小麦、玉米轮作',
    landType: '水浇地',
    subsidy: 2300,
    yield: 1650,
    area: xihedaoLandPlots.find(p => p.id === 'plot-11')?.area || 18000
  }
};

/**
 * 虚构宅基地详情数据
 */
export const mockHomesteadDetails: Record<string, HomesteadDetail> = {
  'home-001': {
    id: 'home-001',
    householdId: 'household-1',
    householdName: '张明远',
    population: 4,
    education: '户主:大专,配偶:高中',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: true,
    religion: '无',
    area: 110
  },
  'home-002': {
    id: 'home-002',
    householdId: 'household-2',
    householdName: '王建国',
    population: 5,
    education: '户主:高中,配偶:高中',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: false,
    religion: '无',
    area: 115
  },
  'home-003': {
    id: 'home-003',
    householdId: 'household-3',
    householdName: '李国强',
    population: 3,
    education: '户主:本科,配偶:大专',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: true,
    religion: '无',
    area: 105
  },
  'home-004': {
    id: 'home-004',
    householdId: 'household-4',
    householdName: '赵德华',
    population: 2,
    education: '户主:初中,配偶:小学',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: false,
    religion: '无',
    area: 100
  },
  'home-005': {
    id: 'home-005',
    householdId: 'household-5',
    householdName: '孙文斌',
    population: 4,
    education: '户主:大专,配偶:大专',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: true,
    religion: '无',
    area: 98
  },
  'home-006': {
    id: 'home-006',
    householdId: 'household-6',
    householdName: '周永强',
    population: 3,
    education: '户主:高中,配偶:高中',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: false,
    religion: '无',
    area: 102
  },
  'home-007': {
    id: 'home-007',
    householdId: 'household-7',
    householdName: '吴建华',
    population: 5,
    education: '户主:高中,配偶:初中',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: false,
    religion: '无',
    area: 108
  },
  'home-008': {
    id: 'home-008',
    householdId: 'household-8',
    householdName: '郑建军',
    population: 4,
    education: '户主:大专,配偶:大专',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: true,
    religion: '无',
    area: 95
  },
  'home-009': {
    id: 'home-009',
    householdId: 'household-9',
    householdName: '何志勇',
    population: 2,
    education: '户主:初中,配偶:初中',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: false,
    religion: '无',
    area: 92
  },
  'home-010': {
    id: 'home-010',
    householdId: 'household-10',
    householdName: '马文涛',
    population: 3,
    education: '户主:本科,配偶:本科',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: true,
    religion: '无',
    area: 103
  },
  'home-011': {
    id: 'home-011',
    householdId: 'household-11',
    householdName: '刘志刚',
    population: 4,
    education: '户主:高中,配偶:高中',
    hasSubsistenceAllowance: false,
    hasFiveGuarantees: false,
    isWorkingOutside: false,
    religion: '无',
    area: 107
  }
};
