import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  GoldOutlined,
  RiseOutlined
} from '@ant-design/icons';
import type { VillageStatistics } from '../types';
import './StatisticsPanel.css';

interface StatisticsPanelProps {
  statistics: VillageStatistics;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ statistics }) => {
  return (
    <div className="statistics-panel">
      <h3 className="panel-title">村庄统计</h3>

      {/* 基础统计卡片 */}
      <div className="stat-cards">
        <Card className="stat-card">
          <Statistic
            title="总人口"
            value={statistics.totalPopulation}
            prefix={<UserOutlined />}
            suffix="人"
          />
        </Card>

        <Card className="stat-card">
          <Statistic
            title="总户数"
            value={statistics.totalHouseholds}
            prefix={<HomeOutlined />}
            suffix="户"
          />
        </Card>

        <Card className="stat-card">
          <Statistic
            title="农田总面积"
            value={(statistics.totalFarmlandArea / 666.67).toFixed(1)}
            prefix={<GoldOutlined />}
            suffix="亩"
          />
        </Card>

        <Card className="stat-card">
          <Statistic
            title="总产量"
            value={(statistics.totalYield / 1000).toFixed(1)}
            prefix={<RiseOutlined />}
            suffix="吨"
          />
        </Card>
      </div>

      {/* 作物分布 */}
      <Card className="chart-card" title="作物分布">
        <div className="crop-distribution">
          {Object.entries(statistics.cropDistribution).map(([crop, area]) => (
            <div key={crop} className="crop-item">
              <div className="crop-name">{crop}</div>
              <div className="crop-bar-container">
                <div
                  className="crop-bar"
                  style={{
                    width: `${(area / statistics.totalFarmlandArea) * 100}%`
                  }}
                />
              </div>
              <div className="crop-value">{(area / 666.67).toFixed(0)}亩</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 学历分布 */}
      <Card className="chart-card" title="学历分布">
        <div className="education-distribution">
          {Object.entries(statistics.educationDistribution).map(([edu, count]) => (
            <Row key={edu} className="education-item">
              <Col span={12} className="education-name">
                {edu}
              </Col>
              <Col span={12} className="education-value">
                {count}人 ({((count / statistics.totalPopulation) * 100).toFixed(1)}%)
              </Col>
            </Row>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StatisticsPanel;