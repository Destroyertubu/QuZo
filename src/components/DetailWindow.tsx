import React from 'react';
import { Modal, Table, Descriptions, Tag } from 'antd';
import type { DetailType, ChartType, Household, VillageStatistics, SurnameDistribution } from '../types';
import ChartCard from './ChartCard';
import {
  getSurnameBarChartOption,
  getSurnamePieChartOption,
  getAgeDistributionChartOption,
  getPopulationTrendChartOption,
  getHomesteadAreaChartOption
} from '../services/chartService';
import './DetailWindow.css';

interface DetailWindowProps {
  visible: boolean;
  type: DetailType;
  title: string;
  data: any;
  chartType?: ChartType;
  onClose: () => void;
}

const DetailWindow: React.FC<DetailWindowProps> = ({ visible, type, title, data, chartType, onClose }) => {
  // 渲染不同类型的详情内容
  const renderContent = () => {
    switch (type) {
      case 'statistics':
        return renderStatistics(data as VillageStatistics);
      case 'household':
        return renderHouseholdList(data);
      case 'surname':
        return renderSurnameDistribution(data);
      case 'population':
        return renderPopulationDetail(data);
      case 'homestead':
        return renderHomesteadDetail(data);
      case 'chart':
        return renderChart();
      case 'village-history':
        return renderVillageHistory();
      case 'organization':
        return renderOrganization();
      case 'land-overview':
        return renderLandOverview(data);
      case 'crop-distribution':
        return renderCropDistribution();
      case 'party-members':
        return renderPartyMembers(data);
      case 'industry-overview':
        return renderIndustryOverview();
      case 'agriculture':
        return renderAgriculture();
      case 'economy':
        return renderEconomy();
      default:
        return <div>暂无数据</div>;
    }
  };

  // 渲染图表
  const renderChart = () => {
    if (!chartType) return <div>图表类型未指定</div>;

    let option;
    switch (chartType) {
      case 'surname-bar':
        option = getSurnameBarChartOption(data.surnameData, false);
        break;
      case 'surname-pie':
        option = getSurnamePieChartOption(data.surnameData, false);
        break;
      case 'age-distribution':
        option = getAgeDistributionChartOption(data.statistics, false);
        break;
      case 'population-trend':
        option = getPopulationTrendChartOption(false);
        break;
      case 'homestead-area':
        option = getHomesteadAreaChartOption(data.statistics, false);
        break;
      default:
        return <div>未知图表类型</div>;
    }

    return (
      <div style={{ width: '100%', padding: '8px' }}>
        <ChartCard title="" option={option} height={450} className="large" />
      </div>
    );
  };

  // 渲染统计概况
  const renderStatistics = (stats: VillageStatistics) => {
    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="总户数">{stats.totalHouseholds} 户</Descriptions.Item>
        <Descriptions.Item label="总人口">{stats.totalPopulation} 人</Descriptions.Item>
        <Descriptions.Item label="党员数">{stats.totalPartyMembers} 人</Descriptions.Item>
        <Descriptions.Item label="党员占比">
          {((stats.totalPartyMembers / stats.totalPopulation) * 100).toFixed(1)}%
        </Descriptions.Item>
        <Descriptions.Item label="宅基地数量">{stats.totalHomesteads} 块</Descriptions.Item>
        <Descriptions.Item label="大地块数量">{stats.totalLandPlots} 块</Descriptions.Item>
        <Descriptions.Item label="宅基地总面积" span={2}>
          {stats.totalHomesteadArea} 平方米 ({(parseFloat(stats.totalHomesteadArea) / 666.67).toFixed(2)} 亩)
        </Descriptions.Item>
        <Descriptions.Item label="户均人口" span={2}>
          {(stats.totalPopulation / stats.totalHouseholds).toFixed(2)} 人/户
        </Descriptions.Item>
      </Descriptions>
    );
  };

  // 渲染户籍列表
  const renderHouseholdList = (households: Household[]) => {
    const columns = [
      {
        title: '户ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
      },
      {
        title: '户主',
        dataIndex: 'householder',
        key: 'householder',
        width: 100,
      },
      {
        title: '姓氏',
        dataIndex: 'surname',
        key: 'surname',
        width: 60,
      },
      {
        title: '家庭人数',
        dataIndex: 'totalMembers',
        key: 'totalMembers',
        width: 80,
        render: (num: number) => `${num} 人`,
      },
      {
        title: '党员数',
        dataIndex: 'partyMembers',
        key: 'partyMembers',
        width: 70,
        render: (num: number) => num > 0 ? <Tag color="red">{num} 人</Tag> : '-',
      },
      {
        title: '家庭成员',
        dataIndex: 'members',
        key: 'members',
        render: (members: any[]) => members.map(m => m.name).join('、'),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={households}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `共 ${total} 户` }}
        scroll={{ y: 400 }}
        size="small"
      />
    );
  };

  // 渲染姓氏分布
  const renderSurnameDistribution = (distribution: SurnameDistribution[]) => {
    const columns = [
      {
        title: '排名',
        key: 'rank',
        width: 60,
        render: (_: any, __: any, index: number) => index + 1,
      },
      {
        title: '姓氏',
        dataIndex: 'surname',
        key: 'surname',
        width: 80,
      },
      {
        title: '户数',
        dataIndex: 'count',
        key: 'count',
        width: 80,
        render: (count: number) => `${count} 户`,
      },
      {
        title: '占比',
        key: 'percentage',
        render: (_: any, record: SurnameDistribution) => {
          const total = distribution.reduce((sum, item) => sum + item.count, 0);
          return `${((record.count / total) * 100).toFixed(1)}%`;
        },
      },
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={distribution}
          rowKey="surname"
          pagination={false}
          size="small"
        />
        <div className="surname-summary">
          <p>共有 {distribution.length} 个姓氏</p>
          <p>前三大姓氏：{distribution.slice(0, 3).map(s => s.surname).join('、')}</p>
        </div>
      </div>
    );
  };

  // 渲染人口详情
  const renderPopulationDetail = (stats: VillageStatistics) => {
    return (
      <div>
        <Descriptions bordered column={2} className="detail-descriptions">
          <Descriptions.Item label="总人口">{stats.totalPopulation} 人</Descriptions.Item>
          <Descriptions.Item label="总户数">{stats.totalHouseholds} 户</Descriptions.Item>
          <Descriptions.Item label="户均人口">
            {(stats.totalPopulation / stats.totalHouseholds).toFixed(2)} 人/户
          </Descriptions.Item>
          <Descriptions.Item label="党员数量">
            <Tag color="red">{stats.totalPartyMembers} 人</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="党员占比" span={2}>
            {((stats.totalPartyMembers / stats.totalPopulation) * 100).toFixed(2)}%
          </Descriptions.Item>
        </Descriptions>

        <div className="population-charts">
          <h4>姓氏分布 TOP 10</h4>
          <div className="surname-bars">
            {stats.surnameDistribution.slice(0, 10).map((item, index) => {
              const maxCount = stats.surnameDistribution[0].count;
              const percentage = (item.count / maxCount) * 100;

              return (
                <div key={item.surname} className="surname-bar-item">
                  <span className="surname-label">
                    <span className="rank">{index + 1}</span>
                    {item.surname}姓
                  </span>
                  <div className="bar-container">
                    <div
                      className="bar"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="count-label">{item.count}户</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // 渲染宅基地详情
  const renderHomesteadDetail = (homestead: any) => {
    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="宅基地ID">{homestead.id}</Descriptions.Item>
        <Descriptions.Item label="户主">{homestead.householder}</Descriptions.Item>
        <Descriptions.Item label="面积">{homestead.area} 平方米</Descriptions.Item>
        <Descriptions.Item label="面积（亩）">
          {(homestead.area / 666.67).toFixed(2)} 亩
        </Descriptions.Item>
      </Descriptions>
    );
  };

  // 渲染村史村情
  const renderVillageHistory = () => {
    return (
      <div className="village-history">
        <div className="history-section">
          <h4>📍 地理位置</h4>
          <p>西河道村位于河北省邯郸市曲周县大河道乡，地处华北平原黑龙港流域，太行山东麓。村庄交通便利，周边农田肥沃，是典型的冀南平原农业村落。</p>
        </div>

        <div className="history-section">
          <h4>📜 历史沿革</h4>
          <p>西河道村历史悠久，据记载村庄形成于明清时期。村名源于古时村旁有一条河道，本村位于河道西侧而得名。曲周县域历史可追溯至西汉初年（公元前201年），刘商封曲周侯，"曲周"之名由此开始。</p>
          <p>新中国成立后，西河道村经历了土地改革、人民公社、改革开放等重要历史时期，逐步发展成为拥有176户、805人的现代化新农村。</p>
        </div>

        <div className="history-section">
          <h4>🏛️ 村落特色</h4>
          <ul>
            <li><strong>姓氏文化：</strong>村内以苑姓、贾姓、刘姓为主，形成了独特的宗族文化传统</li>
            <li><strong>农耕传统：</strong>世代以农耕为主业，种植小麦、玉米等粮食作物</li>
            <li><strong>党建引领：</strong>村党支部带领全村发展，现有党员34名，发挥着战斗堡垒作用</li>
          </ul>
        </div>

        <div className="history-section">
          <h4>🌟 发展成就</h4>
          <p>近年来，西河道村在党支部的带领下，积极推进美丽乡村建设，完善基础设施，发展现代农业，村容村貌焕然一新。全村宅基地管理规范，土地利用科学，为乡村振兴打下坚实基础。</p>
        </div>
      </div>
    );
  };

  // 渲染组织架构
  const renderOrganization = () => {
    return (
      <div className="organization">
        <div className="org-section">
          <h4>🏛️ 村"两委"组织</h4>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="村党支部委员会">
              <div style={{ lineHeight: '1.8' }}>
                <p>• 党支部书记（村委会主任）：主持村党支部全面工作，兼任村委会主任</p>
                <p>• 党支部副书记：协助书记工作，分管组织和宣传</p>
                <p>• 组织委员：负责党员发展、教育管理工作</p>
                <p>• 宣传委员：负责理论学习、精神文明建设</p>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="村民委员会">
              <div style={{ lineHeight: '1.8' }}>
                <p>• 村委会主任：主持村委会日常工作，执行村民会议决定</p>
                <p>• 村委会副主任：协助主任工作，分管民生事务</p>
                <p>• 村委会委员：负责治安、妇女、民兵等专项工作</p>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="org-section" style={{ marginTop: '20px' }}>
          <h4>👥 其他组织</h4>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="村民代表会议">村民自治的议事机构，由村民代表组成</Descriptions.Item>
            <Descriptions.Item label="村务监督委员会">监督村务公开、财务管理等工作</Descriptions.Item>
            <Descriptions.Item label="红白理事会">负责婚丧嫁娶事务的协调管理</Descriptions.Item>
            <Descriptions.Item label="人民调解委员会">调解村民纠纷，维护社会稳定</Descriptions.Item>
          </Descriptions>
        </div>

        <div className="org-section" style={{ marginTop: '20px' }}>
          <h4>📋 工作机制</h4>
          <Tag color="blue">四议两公开</Tag>
          <Tag color="green">民主决策</Tag>
          <Tag color="orange">村务公开</Tag>
          <Tag color="purple">财务透明</Tag>
          <p style={{ marginTop: '12px', color: '#666' }}>
            重大事项严格执行"四议两公开"制度：村党支部提议、村两委商议、党员大会审议、村民代表会议决议，决议和实施结果向全体村民公开。
          </p>
        </div>
      </div>
    );
  };

  // 渲染土地概况
  const renderLandOverview = (stats: VillageStatistics) => {
    const totalLandAcres = (parseFloat(stats.totalHomesteadArea) / 666.67).toFixed(2);

    return (
      <div className="land-overview">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="宅基地总数">{stats.totalHomesteads} 块</Descriptions.Item>
          <Descriptions.Item label="大地块总数">{stats.totalLandPlots} 块</Descriptions.Item>
          <Descriptions.Item label="宅基地总面积">{stats.totalHomesteadArea} m²</Descriptions.Item>
          <Descriptions.Item label="宅基地总面积（亩）">{totalLandAcres} 亩</Descriptions.Item>
          <Descriptions.Item label="户均宅基地面积">
            {(parseFloat(stats.totalHomesteadArea) / stats.totalHouseholds).toFixed(2)} m²
          </Descriptions.Item>
          <Descriptions.Item label="人均宅基地面积">
            {(parseFloat(stats.totalHomesteadArea) / stats.totalPopulation).toFixed(2)} m²
          </Descriptions.Item>
        </Descriptions>

        <div className="land-info-section" style={{ marginTop: '20px' }}>
          <h4>🗺️ 土地利用情况</h4>
          <div className="land-use-grid">
            <div className="land-use-item">
              <div className="land-type-icon">🏠</div>
              <div className="land-type-name">宅基地</div>
              <div className="land-type-desc">村民住宅用地，依法确权登记</div>
            </div>
            <div className="land-use-item">
              <div className="land-type-icon">🌾</div>
              <div className="land-type-name">农用地</div>
              <div className="land-type-desc">耕地、林地等农业生产用地</div>
            </div>
            <div className="land-use-item">
              <div className="land-type-icon">🛤️</div>
              <div className="land-type-name">集体建设用地</div>
              <div className="land-type-desc">村公共设施、道路等用地</div>
            </div>
          </div>
        </div>

        <div className="land-info-section" style={{ marginTop: '20px' }}>
          <h4>📝 土地管理</h4>
          <ul>
            <li>严格执行《土地管理法》和《农村宅基地管理办法》</li>
            <li>实施宅基地"一户一宅"政策，确保公平合理</li>
            <li>建立土地台账，实现信息化管理</li>
            <li>定期开展土地巡查，防止违法用地</li>
          </ul>
        </div>
      </div>
    );
  };

  // 渲染作物分布
  const renderCropDistribution = () => {
    return (
      <div className="crop-distribution">
        <div className="crop-section">
          <h4>🌾 主要农作物</h4>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="小麦" span={2}>
              <Tag color="gold">主要粮食作物</Tag>
              <p>种植面积广，占耕地面积50%以上。秋种冬长，次年6月收获，是村民主要经济来源之一。</p>
            </Descriptions.Item>
            <Descriptions.Item label="玉米" span={2}>
              <Tag color="orange">主要粮食作物</Tag>
              <p>夏播秋收，与小麦形成轮作。种植面积约占耕地40%，产量稳定。</p>
            </Descriptions.Item>
            <Descriptions.Item label="蔬菜" span={2}>
              <Tag color="green">经济作物</Tag>
              <p>部分农户发展大棚蔬菜种植，包括番茄、黄瓜、茄子等，增加经济收入。</p>
            </Descriptions.Item>
            <Descriptions.Item label="经济林木" span={2}>
              <Tag color="cyan">林业经济</Tag>
              <p>村边种植杨树、槐树等林木，既改善生态环境，又增加经济收益。</p>
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="crop-section" style={{ marginTop: '20px' }}>
          <h4>📅 种植时间表</h4>
          <Table
            size="small"
            columns={[
              { title: '作物', dataIndex: 'crop', key: 'crop' },
              { title: '播种时间', dataIndex: 'plant', key: 'plant' },
              { title: '收获时间', dataIndex: 'harvest', key: 'harvest' },
              { title: '亩产', dataIndex: 'yield', key: 'yield' },
            ]}
            dataSource={[
              { key: '1', crop: '小麦', plant: '10月', harvest: '次年6月', yield: '约450公斤' },
              { key: '2', crop: '玉米', plant: '6月', harvest: '10月', yield: '约550公斤' },
              { key: '3', crop: '蔬菜', plant: '全年', harvest: '全年', yield: '按品种而定' },
            ]}
            pagination={false}
          />
        </div>

        <div className="crop-section" style={{ marginTop: '20px' }}>
          <h4>🚜 农业技术</h4>
          <ul>
            <li><strong>机械化耕作：</strong>实现播种、收割全程机械化，提高生产效率</li>
            <li><strong>科学施肥：</strong>推广测土配方施肥，减少化肥使用，保护土壤</li>
            <li><strong>病虫害防治：</strong>采用绿色防控技术，保障农产品质量安全</li>
            <li><strong>节水灌溉：</strong>推广滴灌、喷灌等节水技术，提高水资源利用率</li>
          </ul>
        </div>
      </div>
    );
  };

  // 渲染党员统计
  const renderPartyMembers = (stats: VillageStatistics) => {
    const partyRatio = ((stats.totalPartyMembers / stats.totalPopulation) * 100).toFixed(2);

    return (
      <div className="party-members">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="党员总数">
            <Tag color="red" style={{ fontSize: '16px', padding: '4px 12px' }}>
              {stats.totalPartyMembers} 名
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="党员占比">{partyRatio}%</Descriptions.Item>
          <Descriptions.Item label="村总人口">{stats.totalPopulation} 人</Descriptions.Item>
          <Descriptions.Item label="村总户数">{stats.totalHouseholds} 户</Descriptions.Item>
        </Descriptions>

        <div className="party-section" style={{ marginTop: '20px' }}>
          <h4>🎖️ 党员结构（示例数据）</h4>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="男党员">约 {Math.round(stats.totalPartyMembers * 0.7)} 名</Descriptions.Item>
            <Descriptions.Item label="女党员">约 {Math.round(stats.totalPartyMembers * 0.3)} 名</Descriptions.Item>
            <Descriptions.Item label="60岁以上">约 {Math.round(stats.totalPartyMembers * 0.4)} 名</Descriptions.Item>
            <Descriptions.Item label="60岁以下">约 {Math.round(stats.totalPartyMembers * 0.6)} 名</Descriptions.Item>
            <Descriptions.Item label="大专以上学历">约 {Math.round(stats.totalPartyMembers * 0.25)} 名</Descriptions.Item>
            <Descriptions.Item label="预备党员">约 {Math.round(stats.totalPartyMembers * 0.06)} 名</Descriptions.Item>
          </Descriptions>
        </div>

        <div className="party-section" style={{ marginTop: '20px' }}>
          <h4>📚 党建工作</h4>
          <div className="party-work-grid">
            <div className="party-work-item">
              <div className="work-icon">📖</div>
              <div className="work-title">理论学习</div>
              <div className="work-desc">定期组织党员学习党的理论、政策</div>
            </div>
            <div className="party-work-item">
              <div className="work-icon">🎯</div>
              <div className="work-title">三会一课</div>
              <div className="work-desc">严格执行党支部、党小组会议制度</div>
            </div>
            <div className="party-work-item">
              <div className="work-icon">⭐</div>
              <div className="work-title">主题党日</div>
              <div className="work-desc">每月开展主题党日活动</div>
            </div>
            <div className="party-work-item">
              <div className="work-icon">🤝</div>
              <div className="work-title">为民服务</div>
              <div className="work-desc">党员联系群众，帮扶困难家庭</div>
            </div>
          </div>
        </div>

        <div className="party-section" style={{ marginTop: '20px' }}>
          <h4>🌟 党员作用发挥</h4>
          <ul>
            <li>在农业生产中发挥示范带头作用，推广先进技术</li>
            <li>在疫情防控、防汛抗旱等急难险重任务中冲锋在前</li>
            <li>在矛盾纠纷化解中发挥调解作用，维护村庄和谐</li>
            <li>在乡村振兴中积极建言献策，推动村庄发展</li>
          </ul>
        </div>
      </div>
    );
  };

  // 渲染产业概况
  const renderIndustryOverview = () => {
    return (
      <div className="industry-overview">
        <div className="industry-section">
          <h4>🏭 产业结构</h4>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="第一产业" span={2}>
              <Tag color="green">主导产业</Tag>
              <p>以种植业为主，包括小麦、玉米等粮食作物和蔬菜等经济作物，占村经济总量的70%以上。</p>
            </Descriptions.Item>
            <Descriptions.Item label="第二产业" span={2}>
              <Tag color="blue">辅助产业</Tag>
              <p>部分村民从事建筑、加工等行业，为村集体经济和农户增收提供补充。</p>
            </Descriptions.Item>
            <Descriptions.Item label="第三产业" span={2}>
              <Tag color="orange">新兴产业</Tag>
              <p>少数村民经营小卖部、农资店等服务业，满足村民日常需求。</p>
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="industry-section" style={{ marginTop: '20px' }}>
          <h4>💼 就业情况</h4>
          <div className="employment-grid">
            <div className="employment-item">
              <div className="employment-icon">🌾</div>
              <div className="employment-title">农业从业</div>
              <div className="employment-number">约60%</div>
              <div className="employment-desc">主要从事种植业生产</div>
            </div>
            <div className="employment-item">
              <div className="employment-icon">🏗️</div>
              <div className="employment-title">外出务工</div>
              <div className="employment-number">约25%</div>
              <div className="employment-desc">在外从事建筑、制造等</div>
            </div>
            <div className="employment-item">
              <div className="employment-icon">🏪</div>
              <div className="employment-title">个体经营</div>
              <div className="employment-number">约10%</div>
              <div className="employment-desc">经营商铺、运输等</div>
            </div>
            <div className="employment-item">
              <div className="employment-icon">👴</div>
              <div className="employment-title">其他</div>
              <div className="employment-number">约5%</div>
              <div className="employment-desc">退休、学生等</div>
            </div>
          </div>
        </div>

        <div className="industry-section" style={{ marginTop: '20px' }}>
          <h4>🎯 发展方向</h4>
          <ul>
            <li><strong>现代农业：</strong>发展规模化、机械化、科技化农业生产</li>
            <li><strong>特色种植：</strong>探索发展特色蔬菜、中药材等高效农业</li>
            <li><strong>农产品加工：</strong>延伸产业链，提高农产品附加值</li>
            <li><strong>乡村旅游：</strong>结合美丽乡村建设，发展休闲农业和乡村旅游</li>
          </ul>
        </div>
      </div>
    );
  };

  // 渲染农业生产
  const renderAgriculture = () => {
    return (
      <div className="agriculture">
        <div className="agriculture-section">
          <h4>🌾 生产概况</h4>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="主要作物">小麦、玉米</Descriptions.Item>
            <Descriptions.Item label="种植模式">小麦-玉米轮作</Descriptions.Item>
            <Descriptions.Item label="机械化程度">95%以上</Descriptions.Item>
            <Descriptions.Item label="灌溉方式">井灌为主</Descriptions.Item>
            <Descriptions.Item label="年产粮食">约500吨</Descriptions.Item>
            <Descriptions.Item label="粮食自给率">100%</Descriptions.Item>
          </Descriptions>
        </div>

        <div className="agriculture-section" style={{ marginTop: '20px' }}>
          <h4>🚜 农业设施</h4>
          <Table
            size="small"
            columns={[
              { title: '设施类型', dataIndex: 'type', key: 'type' },
              { title: '数量/规模', dataIndex: 'quantity', key: 'quantity' },
              { title: '用途', dataIndex: 'usage', key: 'usage' },
            ]}
            dataSource={[
              { key: '1', type: '大中型拖拉机', quantity: '约30台', usage: '耕作、运输' },
              { key: '2', type: '联合收割机', quantity: '约15台', usage: '小麦、玉米收获' },
              { key: '3', type: '机井', quantity: '约50眼', usage: '农田灌溉' },
              { key: '4', type: '农机合作社', quantity: '1个', usage: '农机服务' },
              { key: '5', type: '粮食烘干设施', quantity: '若干', usage: '粮食储存' },
            ]}
            pagination={false}
          />
        </div>

        <div className="agriculture-section" style={{ marginTop: '20px' }}>
          <h4>🌱 农业技术推广</h4>
          <div className="tech-grid">
            <div className="tech-item">
              <Tag color="green">测土配方施肥</Tag>
              <p>根据土壤养分状况科学施肥，提高肥料利用率</p>
            </div>
            <div className="tech-item">
              <Tag color="blue">优良品种推广</Tag>
              <p>引进高产、抗病虫害的优良品种</p>
            </div>
            <div className="tech-item">
              <Tag color="orange">病虫害绿色防控</Tag>
              <p>推广生物防治、物理防治等绿色技术</p>
            </div>
            <div className="tech-item">
              <Tag color="purple">节水灌溉技术</Tag>
              <p>推广滴灌、喷灌等高效节水灌溉方式</p>
            </div>
          </div>
        </div>

        <div className="agriculture-section" style={{ marginTop: '20px' }}>
          <h4>📊 农业生产效益</h4>
          <ul>
            <li><strong>粮食产量：</strong>小麦亩产450公斤左右，玉米亩产550公斤左右</li>
            <li><strong>种植成本：</strong>每亩约800-1000元（含种子、化肥、农药、机械等）</li>
            <li><strong>收益情况：</strong>每亩年纯收入约1200-1500元</li>
            <li><strong>国家补贴：</strong>享受粮食直补、农机补贴等惠农政策</li>
          </ul>
        </div>
      </div>
    );
  };

  // 渲染经济收入
  const renderEconomy = () => {
    return (
      <div className="economy">
        <div className="economy-section">
          <h4>💰 收入来源</h4>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="农业种植收入" span={2}>
              <Tag color="green">主要收入</Tag>
              <p>粮食作物和经济作物种植，约占家庭收入的40-50%</p>
            </Descriptions.Item>
            <Descriptions.Item label="外出务工收入" span={2}>
              <Tag color="blue">重要收入</Tag>
              <p>年轻劳动力外出务工，约占家庭收入的30-40%</p>
            </Descriptions.Item>
            <Descriptions.Item label="个体经营收入" span={2}>
              <Tag color="orange">补充收入</Tag>
              <p>小商铺、运输等经营收入，约占10-15%</p>
            </Descriptions.Item>
            <Descriptions.Item label="政策性收入" span={2}>
              <Tag color="purple">政策支持</Tag>
              <p>耕地地力保护补贴、低保等政策性收入</p>
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="economy-section" style={{ marginTop: '20px' }}>
          <h4>📈 收入水平（估算）</h4>
          <Table
            size="small"
            columns={[
              { title: '指标', dataIndex: 'indicator', key: 'indicator' },
              { title: '数值', dataIndex: 'value', key: 'value' },
              { title: '说明', dataIndex: 'note', key: 'note' },
            ]}
            dataSource={[
              { key: '1', indicator: '人均年收入', value: '约1.5-2万元', note: '接近当地农村平均水平' },
              { key: '2', indicator: '户均年收入', value: '约7-9万元', note: '以户均4.6人计算' },
              { key: '3', indicator: '村集体年收入', value: '约30-50万元', note: '包括土地流转、集体企业等' },
            ]}
            pagination={false}
          />
        </div>

        <div className="economy-section" style={{ marginTop: '20px' }}>
          <h4>💸 主要支出</h4>
          <div className="expense-grid">
            <div className="expense-item">
              <div className="expense-icon">🏠</div>
              <div className="expense-title">住房支出</div>
              <div className="expense-desc">房屋建设、维修等</div>
            </div>
            <div className="expense-item">
              <div className="expense-icon">🎓</div>
              <div className="expense-title">教育支出</div>
              <div className="expense-desc">子女上学费用</div>
            </div>
            <div className="expense-item">
              <div className="expense-icon">🏥</div>
              <div className="expense-title">医疗支出</div>
              <div className="expense-desc">看病就医费用</div>
            </div>
            <div className="expense-item">
              <div className="expense-icon">🛒</div>
              <div className="expense-title">日常消费</div>
              <div className="expense-desc">食品、衣物等</div>
            </div>
          </div>
        </div>

        <div className="economy-section" style={{ marginTop: '20px' }}>
          <h4>🎯 增收措施</h4>
          <ul>
            <li><strong>发展特色种植：</strong>引导农户发展大棚蔬菜、优质果品等高效农业</li>
            <li><strong>促进就业创业：</strong>组织劳动力技能培训，提高外出务工收入</li>
            <li><strong>壮大集体经济：</strong>盘活集体资产，增加集体收入和村民分红</li>
            <li><strong>落实惠农政策：</strong>确保各项补贴及时足额发放到户</li>
            <li><strong>完善社会保障：</strong>做好低保、养老保险等工作，兜牢民生底线</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="detail-window"
      destroyOnClose
    >
      <div className="detail-content">
        {renderContent()}
      </div>
    </Modal>
  );
};

export default DetailWindow;
