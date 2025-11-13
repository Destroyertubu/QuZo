import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { LandPlot } from '../types';
import './LandMap.css';

interface LandMapProps {
  landPlots: LandPlot[];
  onLandClick: (plot: LandPlot) => void;
}

// 地块多边形的映射，用于管理多边形对象
interface PlotPolygonMap {
  [plotId: string]: {
    polygon: L.Polygon;
    plot: LandPlot;
  };
}

// 天地图密钥
const TIANDITU_KEY = '58200ecea8821940623e37a6f8b79f85';

const LandMap: React.FC<LandMapProps> = ({ landPlots, onLandClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonsRef = useRef<PlotPolygonMap>({});
  const [hoveredPlotId, setHoveredPlotId] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'satellite' | 'normal'>('satellite');

  // 初始化地图
  useEffect(() => {
    if (!mapContainerRef.current) {
      console.error('地图容器不存在');
      return;
    }

    console.log('开始初始化地图...');

    // 设置中心点 - 曲周县大河道乡西河道村（根据真实数据计算）
    // 数据范围：纬度 36.678470-36.693279，经度 114.910586-114.927255
    const centerLat = 36.685874;  // 所有地块的中心纬度
    const centerLng = 114.918921; // 所有地块的中心经度

    try {
      // 创建地图实例
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 16,  // 缩放级别16，正好能看到整个村庄区域
        zoomControl: true,
        minZoom: 14,
        maxZoom: 18
      });
      mapInstanceRef.current = map;
      console.log('地图实例创建成功，中心点:', centerLat, centerLng);

    // 天地图影像底图 (卫星影像)
    const tdtSatellite = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + TIANDITU_KEY,
      {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution: '© 天地图',
        maxZoom: 18
      }
    );

    // 天地图影像标注 (地名、道路标注)
    const tdtSatelliteAnno = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + TIANDITU_KEY,
      {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution: '© 天地图',
        maxZoom: 18
      }
    );

    // 天地图矢量底图 (街道图)
    const tdtVector = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + TIANDITU_KEY,
      {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution: '© 天地图',
        maxZoom: 18
      }
    );

    // 天地图矢量标注
    const tdtVectorAnno = L.tileLayer(
      'http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + TIANDITU_KEY,
      {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution: '© 天地图',
        maxZoom: 18
      }
    );

    // 添加默认图层（影像+标注）
    tdtSatellite.addTo(map);
    tdtSatelliteAnno.addTo(map);

    // 保存图层引用以便切换
    (map as any)._tiandituLayers = {
      satellite: tdtSatellite,
      satelliteAnno: tdtSatelliteAnno,
      vector: tdtVector,
      vectorAnno: tdtVectorAnno
    };

      // 添加比例尺
      L.control.scale({
        metric: true,
        imperial: false
      }).addTo(map);

      console.log('地图初始化完成');

      // 添加中心标记 - 大河道乡西河道村
      const marker = L.marker([centerLat, centerLng], {
        title: '大河道乡西河道村'
      }).addTo(map);

      marker.bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #0066cc; font-size: 15px;">
            📍 大河道乡西河道村
          </h4>
          <p style="margin: 4px 0; font-size: 13px; color: #666;">
            曲周县大河道乡
          </p>
          <p style="margin: 4px 0; font-size: 12px; color: #999;">
            经度: ${centerLng.toFixed(6)}°<br>
            纬度: ${centerLat.toFixed(6)}°
          </p>
        </div>
      `);

      // 清理函数
      return () => {
        if (mapInstanceRef.current) {
          console.log('清理地图实例');
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        polygonsRef.current = {};
      };
    } catch (error) {
      console.error('地图初始化错误:', error);
    }
  }, []);

  // 绘制地块
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) {
      console.log('地图实例不存在，等待初始化');
      return;
    }
    if (landPlots.length === 0) {
      console.log('没有地块数据');
      return;
    }

    console.log(`开始绘制 ${landPlots.length} 个地块`);

    // 清除现有多边形
    Object.values(polygonsRef.current).forEach(({ polygon }) => {
      map.removeLayer(polygon);
    });
    polygonsRef.current = {};

    // 为每个地块创建多边形
    landPlots.forEach((plot, index) => {
      // 转换坐标为 Leaflet LatLng 数组
      const latlngs: L.LatLngExpression[] = plot.coordinates.map(
        coord => [coord.lat, coord.lng]
      );

      // 确定颜色 - 边框和填充使用相同颜色
      // 大地块用红色，宅基地用蓝色
      const plotColor = plot.type === 'farmland' ? '#FF0000' : '#0000FF';

      // 创建多边形 - 填充和边框使用相同颜色
      const polygon = L.polygon(latlngs, {
        fillColor: plotColor,    // 填充颜色与边框相同
        fillOpacity: 0.3,        // 透明度30%，可以看到底下的卫星图
        color: plotColor,        // 边框颜色
        weight: 3,               // 边框宽度
        opacity: 1.0             // 边框完全不透明
      });

      // 添加到地图
      polygon.addTo(map);

      // 保存引用
      polygonsRef.current[plot.id] = { polygon, plot };

      // 添加点击事件
      polygon.on('click', () => {
        onLandClick(plot);
      });

      // 添加鼠标悬停事件
      polygon.on('mouseover', () => {
        setHoveredPlotId(plot.id);
      });

      polygon.on('mouseout', () => {
        setHoveredPlotId(null);
      });

      // 添加弹窗内容
      let popupContent = `
        <div style="font-size: 13px; font-family: Arial, sans-serif;">
          <h4 style="margin: 0 0 8px 0; color: #0066cc; font-size: 15px;">${plot.name}</h4>
          <p style="margin: 4px 0; color: #666;">
            <strong>类型:</strong> ${plot.type === 'farmland' ? '大地块' : '宅基地'}
          </p>
      `;

      // 如果是宅基地，显示户主和面积
      if (plot.type === 'homestead' && (plot as any).householder) {
        const homestead = plot as any;
        popupContent += `
          <p style="margin: 4px 0; color: #666;">
            <strong>户主:</strong> ${homestead.householder}
          </p>
          <p style="margin: 4px 0; color: #666;">
            <strong>面积:</strong> ${homestead.area.toFixed(2)} m² (${(homestead.area / 666.67).toFixed(2)} 亩)
          </p>
        `;
      } else if (plot.area) {
        popupContent += `
          <p style="margin: 4px 0; color: #666;">
            <strong>面积:</strong> ${plot.area} 平方米
          </p>
        `;
      }

      popupContent += `</div>`;

      polygon.bindPopup(popupContent);
    });

    // 首次加载时调整地图视图以显示所有地块
    if (landPlots.length > 0 && Object.keys(polygonsRef.current).length === landPlots.length) {
      try {
        // 过滤掉无效坐标（lat > 30, lng > 100）
        const validCoords = landPlots
          .flatMap(plot => plot.coordinates)
          .filter(coord => coord.lat > 30 && coord.lng > 100);

        if (validCoords.length > 0) {
          const bounds = L.latLngBounds(
            validCoords.map(coord => [coord.lat, coord.lng] as L.LatLngTuple)
          );
          map.fitBounds(bounds, {
            padding: [60, 60],
            maxZoom: 16,
            animate: true,
            duration: 1.0
          });
          console.log('地图视图已调整到所有地块，中心:', map.getCenter());
        }
      } catch (error) {
        console.error('调整地图视图错误:', error);
      }
    }

    console.log(`地块绘制完成，共 ${landPlots.length} 个`);
  }, [landPlots, onLandClick]);

  // 处理悬停高亮效果
  useEffect(() => {
    Object.entries(polygonsRef.current).forEach(([plotId, { polygon, plot }]) => {
      const isHovered = plotId === hoveredPlotId;

      // 更新多边形样式
      if (isHovered) {
        // 悬停时加深填充透明度
        polygon.setStyle({
          fillOpacity: 0.5,   // 悬停时透明度增加到50%
          weight: 4,          // 边框加粗
          dashArray: '5, 5'   // 虚线边框效果
        });
      } else {
        // 默认样式 - 恢复原始透明度
        polygon.setStyle({
          fillOpacity: 0.3,
          weight: 3,
          dashArray: null
        });
      }
    });
  }, [hoveredPlotId]);

  // 切换地图类型
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const layers = (map as any)._tiandituLayers;
    if (!layers) return;

    if (mapType === 'satellite') {
      // 切换到卫星影像
      map.removeLayer(layers.vector);
      map.removeLayer(layers.vectorAnno);
      map.addLayer(layers.satellite);
      map.addLayer(layers.satelliteAnno);
    } else {
      // 切换到矢量地图
      map.removeLayer(layers.satellite);
      map.removeLayer(layers.satelliteAnno);
      map.addLayer(layers.vector);
      map.addLayer(layers.vectorAnno);
    }
  }, [mapType]);

  // 切换地图类型处理函数
  const handleMapTypeToggle = () => {
    setMapType(prev => prev === 'satellite' ? 'normal' : 'satellite');
  };

  return (
    <div className="land-map">
      <div className="map-header">
        <h3>地块分布图</h3>
        <button
          className="map-type-toggle"
          onClick={handleMapTypeToggle}
          title={mapType === 'satellite' ? '切换到普通地图' : '切换到卫星地图'}
        >
          {mapType === 'satellite' ? '🗺️ 普通' : '🛰️ 卫星'}
        </button>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color farmland"></span>
            <span>农田</span>
          </div>
          <div className="legend-item">
            <span className="legend-color homestead"></span>
            <span>宅基地</span>
          </div>
        </div>
      </div>
      <div
        ref={mapContainerRef}
        className="map-canvas-container"
      />
    </div>
  );
};

export default LandMap;
