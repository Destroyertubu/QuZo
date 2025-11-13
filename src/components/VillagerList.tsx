import React, { useState } from 'react';
import { Input, List, Tag } from 'antd';
import { SearchOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import type { VillagerInfo } from '../types';
import HouseholdModal from './HouseholdModal';
import './VillagerList.css';

interface VillagerListProps {
  villagers: VillagerInfo[];
}

const VillagerList: React.FC<VillagerListProps> = ({ villagers }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState<VillagerInfo | null>(null);

  // 过滤村民列表
  const filteredVillagers = villagers.filter((villager) => {
    if (!searchKeyword) return true;
    return (
      villager.name.includes(searchKeyword) ||
      villager.idCard.includes(searchKeyword) ||
      villager.phone.includes(searchKeyword)
    );
  });

  // 打开家庭信息模态框
  const handleHouseholdClick = (household: VillagerInfo) => {
    setSelectedHousehold(household);
    setModalVisible(true);
  };

  // 关闭模态框
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedHousehold(null);
  };

  return (
    <div className="villager-list">
      <h3 className="list-title">户籍信息</h3>

      {/* 搜索框 */}
      <Input
        placeholder="搜索户主姓名或电话"
        prefix={<SearchOutlined />}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="search-input"
      />

      {/* 户籍列表 */}
      <List
        className="villager-items"
        dataSource={filteredVillagers}
        renderItem={(villager) => (
          <List.Item className="villager-item">
            <div
              className="household-card"
              onClick={() => handleHouseholdClick(villager)}
              style={{ cursor: 'pointer' }}
            >
              <div className="household-header">
                <div className="household-number">
                  <Tag color="green">第{villager.householdNumber}户</Tag>
                </div>
                <div className="household-head">
                  <UserOutlined style={{ marginRight: 6 }} />
                  <span className="head-name">{villager.name}</span>
                  <span className="head-title">（户主）</span>
                </div>
              </div>

              <div className="household-info">
                <div className="info-row">
                  <PhoneOutlined style={{ marginRight: 6, color: '#1890ff' }} />
                  <span className="info-value">{villager.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">家庭人口：</span>
                  <span className="info-value">{villager.memberCount || 1}人</span>
                </div>
              </div>

              <div className="household-land">
                <div className="land-item">
                  <span className="land-label">农田：</span>
                  <span className="land-value">
                    {(villager.farmlandArea / 666.67).toFixed(1)}亩
                  </span>
                </div>
                <div className="land-item">
                  <span className="land-label">宅基地：</span>
                  <span className="land-value">{villager.homesteadArea}㎡</span>
                </div>
              </div>
            </div>
          </List.Item>
        )}
        locale={{ emptyText: '暂无数据' }}
      />

      <div className="list-footer">
        共 {filteredVillagers.length} 户
      </div>

      <HouseholdModal
        visible={modalVisible}
        household={selectedHousehold}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default VillagerList;