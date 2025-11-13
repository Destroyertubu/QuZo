import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './ChartCard.css';

interface ChartCardProps {
  title: string;
  option: echarts.EChartsOption;
  height?: number;
  onClick?: () => void;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  option,
  height = 200,
  onClick,
  className = ''
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表
    chartInstanceRef.current = echarts.init(chartRef.current);
    chartInstanceRef.current.setOption(option);

    // 响应式处理
    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstanceRef.current?.dispose();
    };
  }, []);

  // 更新图表配置
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(option, true);
    }
  }, [option]);

  return (
    <div
      className={`chart-card ${className} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="chart-card-header">
        <h4>{title}</h4>
        {onClick && <span className="expand-hint">点击查看详情 →</span>}
      </div>
      <div
        ref={chartRef}
        className="chart-container"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default ChartCard;
