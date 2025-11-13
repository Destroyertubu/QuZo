import type { LandPlot } from '../types';
import { LandType } from '../types';

/**
 * 西河道村地块数据
 * 规整的四边形地块，便于管理和展示
 */
export const xihedaoLandPlots: LandPlot[] = [
  // 大型地块 - 西北区域
  {
    id: 'plot-1',
    householdId: 'household-1',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9100, lat: 36.6890 },
      { lng: 114.9170, lat: 36.6890 },
      { lng: 114.9170, lat: 36.6825 },
      { lng: 114.9100, lat: 36.6825 }
    ],
    area: 65000
  },
  // 大型地块 - 北部区域
  {
    id: 'plot-2',
    householdId: 'household-2',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9175, lat: 36.6940 },
      { lng: 114.9245, lat: 36.6940 },
      { lng: 114.9245, lat: 36.6850 },
      { lng: 114.9175, lat: 36.6850 }
    ],
    area: 96000
  },
  // 中型地块 - 东北区域
  {
    id: 'plot-3',
    householdId: 'household-3',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9250, lat: 36.6890 },
      { lng: 114.9305, lat: 36.6890 },
      { lng: 114.9305, lat: 36.6830 },
      { lng: 114.9250, lat: 36.6830 }
    ],
    area: 48000
  },
  // 小型地块 - 东部区域
  {
    id: 'plot-4',
    householdId: 'household-4',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9310, lat: 36.6900 },
      { lng: 114.9335, lat: 36.6900 },
      { lng: 114.9335, lat: 36.6870 },
      { lng: 114.9310, lat: 36.6870 }
    ],
    area: 22000
  },
  // 小型地块 - 南部区域第一排
  {
    id: 'plot-5',
    householdId: 'household-5',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9100, lat: 36.6820 },
      { lng: 114.9125, lat: 36.6820 },
      { lng: 114.9125, lat: 36.6795 },
      { lng: 114.9100, lat: 36.6795 }
    ],
    area: 19000
  },
  {
    id: 'plot-6',
    householdId: 'household-6',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9130, lat: 36.6820 },
      { lng: 114.9150, lat: 36.6820 },
      { lng: 114.9150, lat: 36.6800 },
      { lng: 114.9130, lat: 36.6800 }
    ],
    area: 14000
  },
  {
    id: 'plot-7',
    householdId: 'household-7',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9155, lat: 36.6820 },
      { lng: 114.9175, lat: 36.6820 },
      { lng: 114.9175, lat: 36.6800 },
      { lng: 114.9155, lat: 36.6800 }
    ],
    area: 15000
  },
  {
    id: 'plot-8',
    householdId: 'household-8',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9180, lat: 36.6820 },
      { lng: 114.9202, lat: 36.6820 },
      { lng: 114.9202, lat: 36.6800 },
      { lng: 114.9180, lat: 36.6800 }
    ],
    area: 16500
  },
  // 小型地块 - 南部区域第二排
  {
    id: 'plot-9',
    householdId: 'household-9',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9207, lat: 36.6820 },
      { lng: 114.9220, lat: 36.6820 },
      { lng: 114.9220, lat: 36.6805 },
      { lng: 114.9207, lat: 36.6805 }
    ],
    area: 7000
  },
  {
    id: 'plot-10',
    householdId: 'household-10',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9225, lat: 36.6820 },
      { lng: 114.9250, lat: 36.6820 },
      { lng: 114.9250, lat: 36.6798 },
      { lng: 114.9225, lat: 36.6798 }
    ],
    area: 12500
  },
  {
    id: 'plot-11',
    householdId: 'household-11',
    type: LandType.FARMLAND,
    coordinates: [
      { lng: 114.9255, lat: 36.6825 },
      { lng: 114.9285, lat: 36.6825 },
      { lng: 114.9285, lat: 36.6805 },
      { lng: 114.9255, lat: 36.6805 }
    ],
    area: 18000
  }
];