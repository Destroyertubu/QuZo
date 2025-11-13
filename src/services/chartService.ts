import * as echarts from 'echarts';
import type { VillageStatistics, SurnameDistribution } from '../types';

// 姓氏分布柱状图
export function getSurnameBarChartOption(
  surnameData: SurnameDistribution[],
  isSmall: boolean = false
): echarts.EChartsOption {
  const topN = isSmall ? 5 : 10;
  const data = surnameData.slice(0, topN);

  return {
    grid: {
      left: isSmall ? 40 : 60,
      right: isSmall ? 20 : 40,
      top: isSmall ? 30 : 40,
      bottom: isSmall ? 30 : 50
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.surname),
      axisLabel: {
        fontSize: isSmall ? 10 : 12,
        rotate: isSmall ? 45 : 0,
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '户数',
      nameTextStyle: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLabel: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        data: data.map(item => item.count),
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' }
          ])
        },
        label: {
          show: !isSmall,
          position: 'top',
          fontSize: 10
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const item = params[0];
        const surnameItem = data[item.dataIndex];
        return `${item.name}<br/>户数: ${item.value}<br/>占比: ${surnameItem.percentage}%`;
      }
    }
  };
}

// 姓氏分布饼状图
export function getSurnamePieChartOption(
  surnameData: SurnameDistribution[],
  isSmall: boolean = false
): echarts.EChartsOption {
  const topN = isSmall ? 5 : 10;
  const data = surnameData.slice(0, topN);

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}户 ({d}%)'
    },
    legend: {
      show: !isSmall,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      textStyle: {
        fontSize: 11,
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: isSmall ? '60%' : ['40%', '70%'],
        center: isSmall ? ['50%', '50%'] : ['40%', '50%'],
        data: data.map(item => ({
          value: item.count,
          name: item.surname
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: !isSmall,
          formatter: '{b}: {d}%',
          fontSize: 10
        },
        labelLine: {
          show: !isSmall
        }
      }
    ],
    color: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0', '#a8edea', '#ff9a9e']
  };
}

// 人口年龄分布柱状图
export function getAgeDistributionChartOption(
  statistics: VillageStatistics,
  isSmall: boolean = false
): echarts.EChartsOption {
  // 模拟年龄段数据（实际应该从数据中统计）
  const ageGroups = [
    { name: '0-18岁', value: Math.floor(statistics.totalPopulation * 0.18) },
    { name: '19-35岁', value: Math.floor(statistics.totalPopulation * 0.25) },
    { name: '36-50岁', value: Math.floor(statistics.totalPopulation * 0.28) },
    { name: '51-65岁', value: Math.floor(statistics.totalPopulation * 0.20) },
    { name: '66岁以上', value: Math.floor(statistics.totalPopulation * 0.09) }
  ];

  return {
    grid: {
      left: isSmall ? 40 : 60,
      right: isSmall ? 20 : 40,
      top: isSmall ? 30 : 40,
      bottom: isSmall ? 30 : 50
    },
    xAxis: {
      type: 'category',
      data: ageGroups.map(item => item.name),
      axisLabel: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '人数',
      nameTextStyle: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLabel: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        data: ageGroups.map(item => item.value),
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4facfe' },
            { offset: 1, color: '#00f2fe' }
          ])
        },
        label: {
          show: !isSmall,
          position: 'top',
          fontSize: 10
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
  };
}

// 宅基地面积分布饼状图
export function getHomesteadAreaChartOption(
  statistics: VillageStatistics,
  isSmall: boolean = false
): echarts.EChartsOption {
  // 模拟面积分段数据
  const areaRanges = [
    { name: '< 200㎡', value: Math.floor(statistics.homesteadCount * 0.15) },
    { name: '200-300㎡', value: Math.floor(statistics.homesteadCount * 0.35) },
    { name: '300-400㎡', value: Math.floor(statistics.homesteadCount * 0.28) },
    { name: '400-500㎡', value: Math.floor(statistics.homesteadCount * 0.15) },
    { name: '> 500㎡', value: Math.floor(statistics.homesteadCount * 0.07) }
  ];

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}户 ({d}%)'
    },
    legend: {
      show: !isSmall,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      textStyle: {
        fontSize: 11,
        color: '#ffffff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: isSmall ? '60%' : '65%',
        center: isSmall ? ['50%', '50%'] : ['40%', '50%'],
        data: areaRanges,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: !isSmall,
          formatter: '{b}: {d}%',
          fontSize: 10
        },
        labelLine: {
          show: !isSmall
        }
      }
    ],
    color: ['#fa709a', '#fee140', '#30cfd0', '#a8edea', '#ff9a9e']
  };
}

// 人口趋势折线图（模拟数据）
export function getPopulationTrendChartOption(
  isSmall: boolean = false
): echarts.EChartsOption {
  const years = ['2019', '2020', '2021', '2022', '2023', '2024'];
  const population = [780, 785, 792, 798, 802, 805];

  return {
    grid: {
      left: isSmall ? 40 : 60,
      right: isSmall ? 20 : 40,
      top: isSmall ? 30 : 40,
      bottom: isSmall ? 30 : 50
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '人口数',
      nameTextStyle: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLabel: {
        fontSize: isSmall ? 10 : 12,
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      min: 750
    },
    series: [
      {
        data: population,
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' }
          ])
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
            { offset: 1, color: 'rgba(118, 75, 162, 0.1)' }
          ])
        },
        itemStyle: {
          color: '#667eea'
        },
        label: {
          show: !isSmall,
          position: 'top',
          fontSize: 10
        }
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  };
}
