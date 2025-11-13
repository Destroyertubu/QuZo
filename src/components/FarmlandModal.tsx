import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Spin, message } from 'antd';
import type { FarmlandDetail } from '../types';
import { mockFarmlandDetails } from '../services/mockData';
import './DetailModal.css';

interface FarmlandModalProps {
  landId: string;
  visible: boolean;
  onClose: () => void;
}

const FarmlandModal: React.FC<FarmlandModalProps> = ({ landId, visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<FarmlandDetail | null>(null);

  useEffect(() => {
    if (visible && landId) {
      loadDetail();
    }
  }, [visible, landId]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      // 这里使用模拟数据，实际应该调用 API
      // const res = await getFarmlandDetail(landId);
      // setDetail(res.data);

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 300));

      const mockDetail = mockFarmlandDetails[landId];
      if (mockDetail) {
        setDetail(mockDetail);
      } else {
        message.warning('未找到该农田信息');
        onClose();
      }
    } catch (error) {
      message.error('加载农田详情失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="农田详情"
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
          <Descriptions.Item label="种植信息">{detail.plantingInfo}</Descriptions.Item>
          <Descriptions.Item label="种植作物">
            <span className="highlight-value crop">{detail.crops}</span>
          </Descriptions.Item>
          <Descriptions.Item label="土地类型">{detail.landType}</Descriptions.Item>
          <Descriptions.Item label="地块面积">
            {detail.area}㎡ ({(detail.area / 666.67).toFixed(2)}亩)
          </Descriptions.Item>
          <Descriptions.Item label="补贴金额">
            <span className="highlight-value subsidy">¥{detail.subsidy}</span>
          </Descriptions.Item>
          <Descriptions.Item label="产量">
            <span className="highlight-value yield">{detail.yield}公斤</span>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <div className="empty-container">暂无数据</div>
      )}
    </Modal>
  );
};

export default FarmlandModal;