import React from 'react';
import type { VillageStatistics, SurnameDistribution } from '../types';
import ChartCard from './ChartCard';
import {
  getSurnameBarChartOption,
  getSurnamePieChartOption,
  getAgeDistributionChartOption,
  getPopulationTrendChartOption
} from '../services/chartService';
import './StatisticsOverview.css';

interface StatisticsOverviewProps {
  statistics: VillageStatistics;
  surnameData: SurnameDistribution[];
  onCardClick?: (type: string) => void;
  onChartClick?: (chartType: string) => void;
}

const StatisticsOverview: React.FC<StatisticsOverviewProps> = ({ statistics, surnameData, onCardClick, onChartClick }) => {
  const cards = [
    {
      key: 'households',
      title: '总户数',
      value: statistics.totalHouseholds,
      unit: '户',
      icon: '🏘️',
      color: '#667eea'
    },
    {
      key: 'population',
      title: '总人口',
      value: statistics.totalPopulation,
      unit: '人',
      icon: '👥',
      color: '#f093fb'
    },
    {
      key: 'party',
      title: '党员数',
      value: statistics.totalPartyMembers,
      unit: '人',
      icon: '🎖️',
      color: '#ff6b6b'
    },
    {
      key: 'homesteads',
      title: '宅基地',
      value: statistics.totalHomesteads,
      unit: '块',
      icon: '🏠',
      color: '#4ecdc4'
    },
    {
      key: 'land',
      title: '大地块',
      value: statistics.totalLandPlots,
      unit: '块',
      icon: '🌾',
      color: '#95e1d3'
    },
    {
      key: 'area',
      title: '宅基地面积',
      value: parseFloat(statistics.totalHomesteadArea).toFixed(0),
      unit: 'm²',
      icon: '📏',
      color: '#feca57'
    }
  ];

  return (
    <>
      <div className="statistics-overview">
        {cards.map(card => (
          <div
            key={card.key}
            className="stat-card"
            style={{ '--card-color': card.color } as React.CSSProperties}
            onClick={() => onCardClick && onCardClick(card.key)}
          >
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-content">
              <div className="stat-value">
                {card.value}
                <span className="stat-unit">{card.unit}</span>
              </div>
              <div className="stat-title">{card.title}</div>
            </div>
            <div className="stat-bg"></div>
          </div>
        ))}
      </div>

      {/* 图表预览区域 */}
      <div className="charts-preview">
        <h3 className="charts-title">📊 数据分析</h3>
        <div className="charts-grid">
          <ChartCard
            title="姓氏分布（Top 5）"
            option={getSurnameBarChartOption(surnameData, true)}
            height={160}
            onClick={() => onChartClick && onChartClick('surname-bar')}
            className="small"
          />
          <ChartCard
            title="姓氏占比"
            option={getSurnamePieChartOption(surnameData, true)}
            height={160}
            onClick={() => onChartClick && onChartClick('surname-pie')}
            className="small"
          />
          <ChartCard
            title="年龄分布"
            option={getAgeDistributionChartOption(statistics, true)}
            height={160}
            onClick={() => onChartClick && onChartClick('age-distribution')}
            className="small"
          />
          <ChartCard
            title="人口趋势"
            option={getPopulationTrendChartOption(true)}
            height={160}
            onClick={() => onChartClick && onChartClick('population-trend')}
            className="small"
          />
        </div>
      </div>
    </>
  );
};

export default StatisticsOverview;
