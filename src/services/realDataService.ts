import type { Household, LandPlot, Homestead, VillageStatistics } from '../types';

// 导入处理后的JSON数据
import householdsData from '../data/processedHouseholds.json';
import landPlotsData from '../data/processedLandPlots.json';
import homesteadsData from '../data/processedHomesteads.json';
import statisticsData from '../data/statistics.json';

/**
 * 获取所有户籍信息
 */
export function getHouseholds(): Household[] {
  return householdsData as Household[];
}

/**
 * 获取单个户籍信息
 */
export function getHouseholdById(id: string): Household | undefined {
  return householdsData.find((h: any) => h.id === id) as Household | undefined;
}

/**
 * 按姓氏获取户籍信息
 */
export function getHouseholdsBySurname(surname: string): Household[] {
  return householdsData.filter((h: any) => h.surname === surname) as Household[];
}

/**
 * 获取所有大地块信息
 */
export function getLandPlots(): LandPlot[] {
  return landPlotsData as LandPlot[];
}

/**
 * 获取单个大地块信息
 */
export function getLandPlotById(id: string): LandPlot | undefined {
  return landPlotsData.find((p: any) => p.id === id) as LandPlot | undefined;
}

/**
 * 获取所有宅基地信息
 */
export function getHomesteads(): Homestead[] {
  return homesteadsData as Homestead[];
}

/**
 * 获取单个宅基地信息
 */
export function getHomesteadById(id: string): Homestead | undefined {
  return homesteadsData.find((h: any) => h.id === id) as Homestead | undefined;
}

/**
 * 按户主姓名获取宅基地
 */
export function getHomesteadsByHouseholder(householder: string): Homestead[] {
  return homesteadsData.filter((h: any) => h.householder === householder) as Homestead[];
}

/**
 * 获取村庄统计数据
 */
export function getVillageStatistics(): VillageStatistics {
  return statisticsData as VillageStatistics;
}

/**
 * 获取所有地块（大地块+宅基地）
 */
export function getAllPlots(): (LandPlot | Homestead)[] {
  return [...landPlotsData, ...homesteadsData] as (LandPlot | Homestead)[];
}

/**
 * 搜索户籍（按户主姓名）
 */
export function searchHouseholds(keyword: string): Household[] {
  const lowerKeyword = keyword.toLowerCase();
  return householdsData.filter((h: any) =>
    h.householder.toLowerCase().includes(lowerKeyword) ||
    h.surname.toLowerCase().includes(lowerKeyword)
  ) as Household[];
}

/**
 * 获取姓氏统计
 */
export function getSurnameStatistics() {
  const stats = statisticsData as VillageStatistics;
  return stats.surnameDistribution || [];
}
