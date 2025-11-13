import React from 'react';
import { Modal, Descriptions, Tag, Table } from 'antd';
import { UserOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import type { VillagerInfo, HouseholdMember } from '../types';
import './HouseholdModal.css';

interface HouseholdModalProps {
  visible: boolean;
  household: VillagerInfo | null;
  onClose: () => void;
}

const HouseholdModal: React.FC<HouseholdModalProps> = ({ visible, household, onClose }) => {
  if (!household) return null;

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (name: string, record: HouseholdMember) => (
        <div className="member-name">
          <UserOutlined style={{ marginRight: 6, color: '#1890ff' }} />
          <span>{name}</span>
          {record.note && (
            <Tag color="red" style={{ marginLeft: 8 }}>
              {record.note}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '与户主关系',
      dataIndex: 'relationship',
      key: 'relationship',
      width: 100,
      render: (relationship: string) => (
        <Tag color={relationship === '户主' ? 'green' : 'blue'}>
          {relationship}
        </Tag>
      ),
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
      width: 180,
      render: (idCard: string | null) => (
        <div className="id-card">
          <IdcardOutlined style={{ marginRight: 6, color: '#8c8c8c' }} />
          <span>{idCard || '未登记'}</span>
        </div>
      ),
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
      render: (phone: string | null) => (
        <div className="phone">
          <PhoneOutlined style={{ marginRight: 6, color: '#8c8c8c' }} />
          <span>{phone || '未登记'}</span>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div className="modal-title">
          <UserOutlined style={{ marginRight: 8 }} />
          <span>第{household.householdNumber}户 - {household.name}家庭信息</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="household-modal"
    >
      <div className="household-summary">
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="户号">
            第{household.householdNumber}户
          </Descriptions.Item>
          <Descriptions.Item label="户主姓名">
            {household.name}
          </Descriptions.Item>
          <Descriptions.Item label="家庭人口">
            {household.memberCount || 1}人
          </Descriptions.Item>
          <Descriptions.Item label="联系电话">
            {household.phone}
          </Descriptions.Item>
          <Descriptions.Item label="农田面积">
            {(household.farmlandArea / 666.67).toFixed(1)}亩 ({household.farmlandCount}块)
          </Descriptions.Item>
          <Descriptions.Item label="宅基地面积">
            {household.homesteadArea}㎡ ({household.homesteadCount}块)
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className="family-members-section">
        <h4 className="section-title">家庭成员</h4>
        <Table
          columns={columns}
          dataSource={household.members || []}
          rowKey={(record) => `${record.name}-${record.relationship}`}
          pagination={false}
          size="small"
          className="members-table"
        />
      </div>
    </Modal>
  );
};

export default HouseholdModal;