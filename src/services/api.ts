import axios from 'axios';
import type {
  ApiResponse,
  VillageStatistics,
  LandPlot,
  VillagerInfo,
  FarmlandDetail,
  HomesteadDetail,
  PageParams,
  PageResponse
} from '../types';

// 创建 axios 实例
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等认证信息
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      console.error('API Error:', res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// ==================== API 接口定义 ====================

/**
 * 获取村庄统计数据
 * 后端接口: GET /api/statistics
 * 返回: 村庄总体统计信息，用于左侧图表展示
 */
export const getVillageStatistics = (): Promise<ApiResponse<VillageStatistics>> => {
  return request.get('/statistics');
};

/**
 * 获取所有地块数据
 * 后端接口: GET /api/land-plots
 * 返回: 所有地块的坐标和基本信息，用于中间地图绘制
 */
export const getLandPlots = (): Promise<ApiResponse<LandPlot[]>> => {
  return request.get('/land-plots');
};

/**
 * 获取村民列表
 * 后端接口: GET /api/villagers
 * 参数: page, pageSize (分页参数)
 * 返回: 分页的村民信息列表，用于右侧列表展示
 */
export const getVillagers = (params: PageParams): Promise<ApiResponse<PageResponse<VillagerInfo>>> => {
  return request.get('/villagers', { params });
};

/**
 * 根据地块ID获取农田详情
 * 后端接口: GET /api/farmland/:id
 * 参数: id - 农田地块ID
 * 返回: 农田详细信息
 */
export const getFarmlandDetail = (id: string): Promise<ApiResponse<FarmlandDetail>> => {
  return request.get(`/farmland/${id}`);
};

/**
 * 根据地块ID获取宅基地详情
 * 后端接口: GET /api/homestead/:id
 * 参数: id - 宅基地地块ID
 * 返回: 宅基地详细信息
 */
export const getHomesteadDetail = (id: string): Promise<ApiResponse<HomesteadDetail>> => {
  return request.get(`/homestead/${id}`);
};

/**
 * 搜索村民
 * 后端接口: GET /api/villagers/search
 * 参数: keyword - 搜索关键词（姓名或身份证号）
 * 返回: 匹配的村民列表
 */
export const searchVillagers = (keyword: string): Promise<ApiResponse<VillagerInfo[]>> => {
  return request.get('/villagers/search', { params: { keyword } });
};

// ==================== 后端接口规范说明 ====================

/**
 * 后端 API 接口规范文档
 *
 * 基础URL: http://localhost:8080/api
 *
 * 统一响应格式:
 * {
 *   "code": 200,           // 状态码：200-成功，400-客户端错误，500-服务器错误
 *   "message": "success",  // 响应消息
 *   "data": {}            // 响应数据
 * }
 *
 * 接口列表:
 *
 * 1. GET /api/statistics
 *    获取村庄统计数据
 *    响应: VillageStatistics 对象
 *
 * 2. GET /api/land-plots
 *    获取所有地块数据
 *    响应: LandPlot[] 数组
 *
 * 3. GET /api/villagers?page=1&pageSize=10
 *    获取村民列表（分页）
 *    参数: page (页码), pageSize (每页大小)
 *    响应: PageResponse<VillagerInfo> 对象
 *
 * 4. GET /api/farmland/:id
 *    获取农田详情
 *    参数: id (农田地块ID)
 *    响应: FarmlandDetail 对象
 *
 * 5. GET /api/homestead/:id
 *    获取宅基地详情
 *    参数: id (宅基地地块ID)
 *    响应: HomesteadDetail 对象
 *
 * 6. GET /api/villagers/search?keyword=张三
 *    搜索村民
 *    参数: keyword (搜索关键词)
 *    响应: VillagerInfo[] 数组
 */

export default request;