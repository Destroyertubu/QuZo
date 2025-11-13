import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import Sidebar from './components/Sidebar';
import StatisticsOverview from './components/StatisticsOverview';
import LandMap from './components/LandMap';
import DetailWindow from './components/DetailWindow';
import DigitalAssistant from './components/DigitalAssistant';
import type { DetailType, ChartType, VillageStatistics, Household } from './types';
import {
  getVillageStatistics,
  getHouseholds,
  getAllPlots,
  getSurnameStatistics
} from './services/realDataService';
import './App.css';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const [statistics, setStatistics] = useState<VillageStatistics | null>(null);
  const [households, setHouseholds] = useState<Household[]>([]);
  const [allPlots, setAllPlots] = useState<any[]>([]);

  // 详情窗口状态
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailType, setDetailType] = useState<DetailType>(null);
  const [detailTitle, setDetailTitle] = useState('');
  const [detailData, setDetailData] = useState<any>(null);
  const [chartType, setChartType] = useState<ChartType | undefined>(undefined);

  // 加载数据
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const stats = getVillageStatistics();
      const householdData = getHouseholds();
      const plotsData = getAllPlots();

      setStatistics(stats);
      setHouseholds(householdData);
      setAllPlots(plotsData);

      console.log('数据加载成功:', {
        户数: householdData.length,
        地块数: plotsData.length,
        人口: stats.totalPopulation
      });
    } catch (error) {
      message.error('加载数据失败');
      console.error('数据加载错误:', error);
    }
  };

  // 处理菜单点击
  const handleMenuClick = (key: string, type: DetailType) => {
    console.log('菜单点击:', key, type);

    if (!statistics) return;

    let title = '';
    let detailData: any = null;

    switch (key) {
      case 'village-overview':
        title = '村庄概况';
        detailData = statistics;
        break;
      case 'village-history':
        title = '村史村情';
        detailData = null;
        break;
      case 'organization':
        title = '组织架构';
        detailData = null;
        break;
      case 'land-overview':
        title = '土地概况';
        detailData = statistics;
        break;
      case 'crop-distribution':
        title = '作物分布';
        detailData = null;
        break;
      case 'population-overview':
        title = '人口概况';
        detailData = statistics;
        break;
      case 'household-list':
        title = '户籍列表';
        detailData = households;
        break;
      case 'surname-distribution':
        title = '姓氏分布';
        detailData = getSurnameStatistics();
        break;
      case 'party-members':
        title = '党员统计';
        detailData = statistics;
        break;
      case 'industry-overview':
        title = '产业概况';
        detailData = null;
        break;
      case 'agriculture':
        title = '农业生产';
        detailData = null;
        break;
      case 'economy':
        title = '经济收入';
        detailData = null;
        break;
      default:
        return;
    }

    setDetailType(type);
    setDetailTitle(title);
    setDetailData(detailData);
    setDetailVisible(true);
  };

  // 处理统计卡片点击
  const handleStatCardClick = (cardKey: string) => {
    if (!statistics) return;

    let type: DetailType = null;
    let title = '';
    let data: any = null;

    switch (cardKey) {
      case 'households':
      case 'population':
        type = 'population';
        title = '人口详情';
        data = statistics;
        break;
      case 'party':
        type = 'population';
        title = '党员统计';
        data = statistics;
        break;
      default:
        return;
    }

    setDetailType(type);
    setDetailTitle(title);
    setDetailData(data);
    setDetailVisible(true);
  };

  // 处理地块点击
  const handlePlotClick = (plot: any) => {
    setDetailType('homestead');
    setDetailTitle(`${plot.name} 详情`);
    setDetailData(plot);
    setDetailVisible(true);
  };

  // 处理图表点击
  const handleChartClick = (type: string) => {
    if (!statistics) return;

    const surnameData = getSurnameStatistics();
    let title = '';

    switch (type) {
      case 'surname-bar':
        title = '姓氏分布柱状图';
        break;
      case 'surname-pie':
        title = '姓氏占比饼状图';
        break;
      case 'age-distribution':
        title = '年龄分布统计';
        break;
      case 'population-trend':
        title = '人口趋势分析';
        break;
      case 'homestead-area':
        title = '宅基地面积分布';
        break;
      default:
        return;
    }

    setDetailType('chart');
    setChartType(type as ChartType);
    setDetailTitle(title);
    setDetailData({ surnameData, statistics });
    setDetailVisible(true);
  };

  // 关闭详情窗口
  const handleDetailClose = () => {
    setDetailVisible(false);
    setDetailType(null);
    setDetailTitle('');
    setDetailData(null);
    setChartType(undefined);
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏘️</span>
            <h1>大河道乡数字乡村平台</h1>
          </div>
          <div className="header-info">
            <span className="village-name">西河道村</span>
          </div>
        </div>
      </Header>

      <Layout className="main-layout">
        {/* 左侧统计面板 */}
        <Sider width={300} className="app-sider left-sider">
          <div className="stats-panel">
            <div className="stats-panel-header">
              <h3>📊 数据概览</h3>
            </div>
            <div className="stats-panel-content">
              {statistics && (
                <StatisticsOverview
                  statistics={statistics}
                  surnameData={getSurnameStatistics()}
                  onCardClick={handleStatCardClick}
                  onChartClick={handleChartClick}
                />
              )}
            </div>
          </div>
        </Sider>

        {/* 中间地图区域 */}
        <Content className="map-content">
          <LandMap
            landPlots={allPlots as any}
            onLandClick={handlePlotClick}
          />
        </Content>

        {/* 右侧菜单 */}
        <Sider width={240} className="app-sider right-sider">
          <Sidebar onMenuClick={handleMenuClick} />
        </Sider>
      </Layout>

      {/* 详情窗口 */}
      {detailVisible && (
        <DetailWindow
          visible={detailVisible}
          type={detailType}
          title={detailTitle}
          data={detailData}
          chartType={chartType}
          onClose={handleDetailClose}
        />
      )}

      {/* 数字助手 */}
      {statistics && (
        <DigitalAssistant
          statistics={statistics}
          autoPlay={true}
        />
      )}
    </Layout>
  );
};

export default App;
