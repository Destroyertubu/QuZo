import type { VillageStatistics } from '../types';

/**
 * 播报脚本类型
 */
export interface NarratorScript {
  id: string;
  title: string;
  content: string;
  duration?: number; // 预计时长（秒）
}

/**
 * 欢迎词
 */
export function getWelcomeScript(): NarratorScript {
  return {
    id: 'welcome',
    title: '欢迎致辞',
    content: `欢迎来到大河道乡西河道村数字乡村管理平台。我是您的智能助手，将为您介绍我们村庄的基本情况。西河道村位于河北省邯郸市曲周县大河道乡，是一个历史悠久、民风淳朴的传统村落。`,
    duration: 15
  };
}

/**
 * 村庄概况播报
 */
export function getVillageOverviewScript(stats: VillageStatistics): NarratorScript {
  return {
    id: 'village-overview',
    title: '村庄概况',
    content: `让我为您介绍西河道村的基本情况。
我村现有户籍人口${stats.totalHouseholds}户，共计${stats.totalPopulation}人。
其中，中国共产党党员${stats.totalPartyMembers}人，占总人口的${((stats.totalPartyMembers / stats.totalPopulation) * 100).toFixed(1)}%。
全村共有宅基地${stats.totalHomesteads}块，总面积${(parseFloat(stats.totalHomesteadArea) / 666.67).toFixed(0)}亩，
农田大地块${stats.totalLandPlots}块。
村民以农业生产为主，主要种植小麦、玉米等粮食作物，村庄经济稳步发展。`,
    duration: 30
  };
}

/**
 * 人口结构播报
 */
export function getPopulationScript(stats: VillageStatistics): NarratorScript {
  const top3Surnames = stats.surnameDistribution.slice(0, 3);
  const surnameText = top3Surnames
    .map((s, i) => `${i === 0 ? '最多' : i === 1 ? '其次' : '第三'}的是${s.surname}姓，有${s.count}户，占比${s.percentage}%`)
    .join('，');

  return {
    id: 'population',
    title: '人口结构',
    content: `我村人口结构相对稳定，户均人口${(stats.totalPopulation / stats.totalHouseholds).toFixed(1)}人。
从姓氏分布来看，${surnameText}。
这反映了我村多姓氏聚居、和谐共处的特点。村民以中青年为主力，老年人口占比适中，人口结构较为合理。`,
    duration: 25
  };
}

/**
 * 土地资源播报
 */
export function getLandResourceScript(stats: VillageStatistics): NarratorScript {
  const avgHomesteadArea = parseFloat(stats.totalHomesteadArea) / stats.totalHomesteads;

  return {
    id: 'land-resource',
    title: '土地资源',
    content: `我村土地资源丰富，规划合理。
宅基地方面，全村共有${stats.totalHomesteads}块宅基地，总面积${(parseFloat(stats.totalHomesteadArea) / 666.67).toFixed(0)}亩，
户均宅基地面积约${avgHomesteadArea.toFixed(0)}平方米。
农业用地方面，划分为${stats.totalLandPlots}个大地块，便于集中管理和机械化耕作。
通过数字化地图管理，我们实现了土地资源的精准管理和高效利用。`,
    duration: 30
  };
}

/**
 * 党建工作播报
 */
export function getPartyBuildingScript(stats: VillageStatistics): NarratorScript {
  return {
    id: 'party-building',
    title: '党建工作',
    content: `我村高度重视党建工作，充分发挥党组织的战斗堡垒作用。
目前，全村共有中共党员${stats.totalPartyMembers}名，占总人口的${((stats.totalPartyMembers / stats.totalPopulation) * 100).toFixed(1)}%。
党员同志们积极发挥先锋模范作用，在乡村振兴、为民服务、疫情防控等各项工作中冲在前线，
为村庄发展做出了重要贡献。`,
    duration: 25
  };
}

/**
 * 数字化建设播报
 */
export function getDigitalVillageScript(): NarratorScript {
  return {
    id: 'digital-village',
    title: '数字化建设',
    content: `我村积极响应国家乡村振兴战略，大力推进数字乡村建设。
通过建设这个数字乡村管理平台，我们实现了村务管理的信息化、智能化。
平台集成了人口管理、土地管理、产业发展等多个模块，
运用地图可视化、数据分析等技术手段，为村庄治理提供了科学决策依据。
未来，我们将继续深化数字化应用，为村民提供更加便捷高效的公共服务。`,
    duration: 30
  };
}

/**
 * 数据亮点播报
 */
export function getDataHighlightsScript(stats: VillageStatistics): NarratorScript {
  const partyMemberRatio = ((stats.totalPartyMembers / stats.totalPopulation) * 100).toFixed(1);
  const avgPeoplePerHouse = (stats.totalPopulation / stats.totalHouseholds).toFixed(1);

  return {
    id: 'data-highlights',
    title: '数据亮点',
    content: `让我为您介绍几个值得关注的数据。
第一，党员占比达到${partyMemberRatio}%，高于全国农村平均水平，体现了我村良好的政治生态。
第二，户均人口${avgPeoplePerHouse}人，说明家庭结构稳定，有利于村庄的长期发展。
第三，通过精准的土地测绘，我们实现了宅基地和农田的数字化管理，做到了底数清、情况明。
这些数据不仅是数字，更是我村发展的真实写照。`,
    duration: 30
  };
}

/**
 * 导航提示
 */
export function getNavigationScript(): NarratorScript {
  return {
    id: 'navigation',
    title: '操作指引',
    content: `您可以通过左侧菜单，浏览村庄信息、土地信息、人口信息和产业发展等模块。
点击地图上的地块，可以查看详细信息。
点击顶部的统计卡片和图表，可以查看更多数据分析。
如需我再次播报，请点击右下角的数字助手按钮。
祝您使用愉快！`,
    duration: 20
  };
}

/**
 * 获取所有脚本列表
 */
export function getAllScripts(stats: VillageStatistics): NarratorScript[] {
  return [
    getWelcomeScript(),
    getVillageOverviewScript(stats),
    getPopulationScript(stats),
    getLandResourceScript(stats),
    getPartyBuildingScript(stats),
    getDigitalVillageScript(),
    getDataHighlightsScript(stats),
    getNavigationScript()
  ];
}

/**
 * 获取完整导览脚本（连续播报所有内容）
 */
export function getFullTourScript(stats: VillageStatistics): NarratorScript {
  const scripts = [
    getWelcomeScript(),
    getVillageOverviewScript(stats),
    getPopulationScript(stats),
    getLandResourceScript(stats)
  ];

  return {
    id: 'full-tour',
    title: '完整导览',
    content: scripts.map(s => s.content).join('\n\n'),
    duration: scripts.reduce((sum, s) => sum + (s.duration || 0), 0)
  };
}
