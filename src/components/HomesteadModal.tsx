import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Tag, Spin, message } from 'antd';
import type { HomesteadDetail } from '../types';
import { mockHomesteadDetails } from '../services/mockData';
import './DetailModal.css';

interface HomesteadModalProps {
  landId: string;
  visible: boolean;
  onClose: () => void;
}

const HomesteadModal: React.FC<HomesteadModalProps> = ({ landId, visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<HomesteadDetail | null>(null);

  useEffect(() => {
    if (visible && landId) {
      loadDetail();
    }
  }, [visible, landId]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      // 这里使用模拟数据，实际应该调用 API
      // const res = await getHomesteadDetail(landId);
      // setDetail(res.data);

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 300));

      const mockDetail = mockHomesteadDetails[landId];
      if (mockDetail) {
        setDetail(mockDetail);
      } else {
        message.warning('未找到该宅基地信息');
        onClose();
      }
    } catch (error) {
      message.error('加载宅基地详情失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderBooleanTag = (value: boolean) => {
    return value ? (
      <Tag color="success">是</Tag>
    ) : (
      <Tag color="default">否</Tag>
    );
  };

  return (
    <Modal
      title="宅基地详情"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      className="detail-modal"
    >
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : detail ? (
        <Descriptions column={1} bordered className="detail-descriptions">
          <Descriptions.Item label="户主姓名">{detail.householdName}</Descriptions.Item>
          <Descriptions.Item label="地块ID">{detail.id}</Descriptions.Item>
          <Descriptions.Item label="户ID">{detail.householdId}</Descriptions.Item>
          <Descriptions.Item label="家庭人口">
            <span className="highlight-value population">{detail.population}人</span>
          </Descriptions.Item>
          <Descriptions.Item label="学历情况">{detail.education}</Descriptions.Item>
          <Descriptions.Item label="是否享受低保">
            {renderBooleanTag(detail.hasSubsistenceAllowance)}
          </Descriptions.Item>
          <Descriptions.Item label="是否五保户">
            {renderBooleanTag(detail.hasFiveGuarantees)}
          </Descriptions.Item>
          <Descriptions.Item label="是否外出打工">
            {renderBooleanTag(detail.isWorkingOutside)}
          </Descriptions.Item>
          <Descriptions.Item label="宗教情况">{detail.religion}</Descriptions.Item>
          <Descriptions.Item label="宅基地面积">
            {detail.area}㎡
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <div className="empty-container">暂无数据</div>
      )}
    </Modal>
  );
};

export default HomesteadModal;