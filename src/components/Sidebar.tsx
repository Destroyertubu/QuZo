import React, { useState } from 'react';
import { Menu } from 'antd';
import type { MenuItem, DetailType } from '../types';
import './Sidebar.css';

interface SidebarProps {
  onMenuClick: (key: string, type: DetailType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const [openKeys, setOpenKeys] = useState<string[]>(['village-info']);

  // 菜单项配置
  const menuItems: MenuItem[] = [
    {
      key: 'village-info',
      label: '村庄信息',
      icon: '🏘️',
      children: [
        { key: 'village-overview', label: '村庄概况', icon: '📊' },
        { key: 'village-history', label: '村史村情', icon: '📜' },
        { key: 'organization', label: '组织架构', icon: '🏛️' },
      ]
    },
    {
      key: 'land-info',
      label: '土地信息',
      icon: '🌾',
      children: [
        { key: 'land-overview', label: '土地概况', icon: '📈' },
        { key: 'farmland', label: '农田分布', icon: '🌱' },
        { key: 'homestead', label: '宅基地', icon: '🏠' },
        { key: 'crop-distribution', label: '作物分布', icon: '🌽' },
      ]
    },
    {
      key: 'population-info',
      label: '人口信息',
      icon: '👥',
      children: [
        { key: 'population-overview', label: '人口概况', icon: '📊' },
        { key: 'household-list', label: '户籍列表', icon: '📋' },
        { key: 'surname-distribution', label: '姓氏分布', icon: '👨‍👩‍👧‍👦' },
        { key: 'party-members', label: '党员统计', icon: '🎖️' },
      ]
    },
    {
      key: 'industry-info',
      label: '产业发展',
      icon: '🏭',
      children: [
        { key: 'industry-overview', label: '产业概况', icon: '📊' },
        { key: 'agriculture', label: '农业生产', icon: '🚜' },
        { key: 'economy', label: '经济收入', icon: '💰' },
      ]
    }
  ];

  // 转换为Ant Design Menu需要的格式
  const convertToAntdMenu = (items: MenuItem[]): any[] => {
    return items.map(item => ({
      key: item.key,
      label: (
        <span>
          {item.icon && <span className="menu-icon">{item.icon}</span>}
          <span className="menu-label">{item.label}</span>
        </span>
      ),
      children: item.children ? convertToAntdMenu(item.children) : undefined,
    }));
  };

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    // 根据key确定显示什么详情
    let detailType: DetailType = null;

    switch (key) {
      case 'village-overview':
        detailType = 'statistics';
        break;
      case 'village-history':
        detailType = 'village-history';
        break;
      case 'organization':
        detailType = 'organization';
        break;
      case 'land-overview':
        detailType = 'land-overview';
        break;
      case 'farmland':
      case 'homestead':
        detailType = 'landPlot';
        break;
      case 'crop-distribution':
        detailType = 'crop-distribution';
        break;
      case 'population-overview':
        detailType = 'population';
        break;
      case 'household-list':
        detailType = 'household';
        break;
      case 'surname-distribution':
        detailType = 'surname';
        break;
      case 'party-members':
        detailType = 'party-members';
        break;
      case 'industry-overview':
        detailType = 'industry-overview';
        break;
      case 'agriculture':
        detailType = 'agriculture';
        break;
      case 'economy':
        detailType = 'economy';
        break;
      default:
        detailType = null;
    }

    onMenuClick(key, detailType);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>导航菜单</h3>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        onClick={handleMenuClick}
        items={convertToAntdMenu(menuItems)}
        className="sidebar-menu"
      />
    </div>
  );
};

export default Sidebar;
