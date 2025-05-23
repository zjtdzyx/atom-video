/**
 * 创作者服务
 *
 * 提供创作者工作区所需的API调用封装
 */

import api from '../api';
import {
  CreatorStats,
  VideoAnalytics,
  CreatorVideo,
  CreatorComment,
  ChannelSettings,
  PaginatedResult,
  VideoStats,
  TrendData,
} from './types';

/**
 * 创作者服务
 */
const creatorService = {
  // 统计数据
  async getCreatorStats(period: string = '30d'): Promise<CreatorStats> {
    try {
      const response = await api.get<{ success: boolean; data: CreatorStats }>(
        '/api/creator/stats',
        {
      params: { period },
        }
      );

      // 确保返回数据字段完整，避免undefined值
      return {
        totalVideos: 0,
        publishedVideos: 0,
        draftVideos: 0,
        videosTrend: 0,
        publishedVideosTrend: 0,
        draftVideosTrend: 0,
        totalViews: 0,
        totalMinutesWatched: 0,
        averageViewDuration: 0,
        viewsTrend: 0,
        minutesWatchedTrend: 0,
        viewDurationTrend: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        likesTrend: 0,
        commentsTrend: 0,
        sharesTrend: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        pendingRevenue: 0,
        revenueTrend: 0,
        monthlyRevenueTrend: 0,
        lastUpdated: new Date().toISOString(),
        ...response.data,
      };
    } catch (error) {
      console.error('获取创作者统计数据失败:', error);
      // 返回默认值以防止UI出错
      return {
        totalVideos: 0,
        publishedVideos: 0,
        draftVideos: 0,
        videosTrend: 0,
        publishedVideosTrend: 0,
        draftVideosTrend: 0,
        totalViews: 0,
        totalMinutesWatched: 0,
        averageViewDuration: 0,
        viewsTrend: 0,
        minutesWatchedTrend: 0,
        viewDurationTrend: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        likesTrend: 0,
        commentsTrend: 0,
        sharesTrend: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        pendingRevenue: 0,
        revenueTrend: 0,
        monthlyRevenueTrend: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
  },

  // 内容趋势数据
  async getContentTrends(period: string = '30d'): Promise<TrendData> {
    try {
    const response = await api.get<{ success: boolean; data: TrendData }>(
      '/api/creator/trends/content',
      {
        params: { period },
      }
    );
      return response.data || [];
    } catch (error) {
      console.error('获取内容趋势数据失败:', error);
      return []; // 返回空数组，避免UI错误
    }
  },

  // 观看量趋势数据
  async getViewsTrends(period: string = '30d'): Promise<TrendData> {
    try {
    const response = await api.get<{ success: boolean; data: TrendData }>(
      '/api/creator/trends/views',
      {
        params: { period },
      }
    );
      return response.data || [];
    } catch (error) {
      console.error('获取观看趋势数据失败:', error);
      return []; // 返回空数组，避免UI错误
    }
  },

  // 互动趋势数据
  async getEngagementTrends(period: string = '30d'): Promise<TrendData> {
    try {
    const response = await api.get<{ success: boolean; data: TrendData }>(
      '/api/creator/trends/engagement',
      {
        params: { period },
      }
    );
      return response.data || [];
    } catch (error) {
      console.error('获取互动趋势数据失败:', error);
      return []; // 返回空数组，避免UI错误
    }
  },

  // 收入趋势数据
  async getRevenueTrends(period: string = '30d'): Promise<TrendData> {
    try {
    const response = await api.get<{ success: boolean; data: TrendData }>(
      '/api/creator/trends/revenue',
      {
        params: { period },
      }
    );
      return response.data || [];
    } catch (error) {
      console.error('获取收入趋势数据失败:', error);
      return []; // 返回空数组，避免UI错误
    }
  },

  // 获取表现最佳的视频
  async getTopVideos(params: {
    metric: string;
    period: string;
    limit: number;
  }): Promise<VideoStats[]> {
    try {
    const response = await api.get<{ success: boolean; data: VideoStats[] }>(
      '/api/creator/top-videos',
      {
        params,
      }
    );
      return response.data || [];
    } catch (error) {
      console.error('获取表现最佳视频失败:', error);
      return []; // 返回空数组，避免UI错误
    }
  },

  // 视频数据
  async getCreatorVideos(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    query?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedResult<CreatorVideo>> {
    const response = await api.get<{ success: boolean; data: PaginatedResult<CreatorVideo> }>(
      '/api/creator/videos',
      { params }
    );

    // 确保返回的数据符合预期格式
    if (!response.data) {
      // 如果没有data字段，创建一个空的默认返回值
      return {
        data: [],
        total: 0,
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        totalPages: 0,
      };
    }

    return response.data;
  },

  // 获取单个视频
  async getVideoById(videoId: string): Promise<CreatorVideo> {
    const response = await api.get<{ success: boolean; data: CreatorVideo }>(
      `/api/creator/videos/${videoId}`
    );
    return response.data;
  },

  // 更新视频信息
  async updateVideo(videoId: string, data: Partial<CreatorVideo>): Promise<CreatorVideo> {
    const response = await api.put<{ success: boolean; data: CreatorVideo }>(
      `/api/creator/videos/${videoId}`,
      data
    );
    return response.data;
  },

  // 删除视频
  async deleteVideo(videoId: string): Promise<{ success: boolean; message: string }> {
    return await api.delete(`/api/creator/videos/${videoId}`);
  },

  // 视频分析数据
  async getVideoAnalytics(videoId: string): Promise<VideoAnalytics> {
    const response = await api.get<{ success: boolean; data: VideoAnalytics }>(
      `/api/creator/videos/${videoId}/analytics`
    );
    return response.data;
  },

  // 评论数据
  async getCreatorComments(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    videoId?: string;
  }): Promise<PaginatedResult<CreatorComment>> {
    const response = await api.get<{ success: boolean; data: PaginatedResult<CreatorComment> }>(
      '/api/creator/comments',
      { params }
    );

    // 确保返回的数据符合预期格式
    if (!response.data) {
      // 如果没有data字段，创建一个空的默认返回值
      return {
        data: [],
        total: 0,
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        totalPages: 0,
      };
    }

    return response.data;
  },

  // 回复评论
  async replyToComment(commentId: string, content: string): Promise<CreatorComment> {
    const response = await api.post<{ success: boolean; data: CreatorComment }>(
      `/api/creator/comments/${commentId}/reply`,
      { content }
    );
    return response.data;
  },

  // 删除评论
  async deleteComment(commentId: string): Promise<{ success: boolean; message: string }> {
    return await api.delete(`/api/creator/comments/${commentId}`);
  },

  // 频道设置
  async getChannelSettings(): Promise<ChannelSettings> {
    const response = await api.get<{ success: boolean; data: ChannelSettings }>(
      '/api/creator/channel'
    );
    return response.data;
  },

  // 更新频道设置
  async updateChannelSettings(data: Partial<ChannelSettings>): Promise<ChannelSettings> {
    const response = await api.put<{ success: boolean; data: ChannelSettings }>(
      '/api/creator/channel',
      data
    );
    return response.data;
  },

  // 获取收入数据
  async getRevenueData(period: 'week' | 'month' | 'year'): Promise<{
    data: number[];
    labels: string[];
    total: number;
  }> {
    const response = await api.get<{
      success: boolean;
      data: { data: number[]; labels: string[]; total: number };
    }>('/api/creator/revenue', { params: { period } });
    return response.data;
  },
};

export default creatorService;
