/**
 * @file video.ts
 * @description 视频相关的类型定义
 * @author Atom Video Team
 * @date 2025-04-06
 */

// 技术栈说明：
// - TypeScript: 强类型支持
// - Vue 3: 类型集成

import type { User, Author, Video } from './index';
import type { Tag } from './tags';
import { User as UserType } from './user';

// 视频状态
export enum VideoStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  PUBLISHED = 'published',
  PRIVATE = 'private',
  DELETED = 'deleted',
}

// 视频分类
export enum VideoCategory {
  ENTERTAINMENT = 'entertainment',
  EDUCATION = 'education',
  GAMING = 'gaming',
  MUSIC = 'music',
  SPORTS = 'sports',
  TECH = 'tech',
  OTHER = 'other',
}

// 视频类型及其相关接口定义
export interface VideoInfo {
  id: string;
  title: string;
  description: string;
  author: UserType;
  publishDate: string;
  views: number;
  likes: number;
  duration: number; // 单位：秒
  thumbnailUrl: string;
  videoUrl: string;
  tags: string[];
}

export interface VideoDetailInfo extends VideoInfo {
  comments: Comment[];
  relatedVideos: VideoInfo[];
  nextVideo?: VideoInfo;
  isLiked: boolean;
  isFavorited: boolean;
}

export interface VideoUploadInfo {
  title: string;
  description: string;
  tags: string[];
  thumbnailFile: File;
  videoFile: File;
}

export interface VideoUpdateInfo {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  thumbnailFile?: File;
}

export interface VideoFilterOptions {
  sort: 'newest' | 'popular' | 'trending';
  category?: string;
  duration?: 'short' | 'medium' | 'long';
  date?: 'today' | 'week' | 'month' | 'year';
}

export interface VideoPlayerConfig {
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  volume: number;
  quality: '1080p' | '720p' | '480p' | '360p';
  playbackRate: number;
  danmakuEnabled: boolean;
}

export interface VideoComment {
  id: string;
  content: string;
  author: UserType;
  createTime: string;
  likes: number;
  replies?: VideoComment[];
  isLiked?: boolean;
}

export interface VideoStats {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalFavorites: number;
  viewsGraph: {
    labels: string[];
    data: number[];
  };
  topCountries: {
    country: string;
    views: number;
  }[];
  demographics: {
    ageRange: string;
    percentage: number;
  }[];
}

// 更新视频接口定义，包含更多字段
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  favorites?: number;
  comments?: number;
  createdAt: string;
  tags: string[];
  author: {
    id: string;
    nickname: string;
    avatar: string;
    verified: boolean;
    followersCount?: number;
    followingCount?: number;
  };
  videoUrl?: string; // 视频播放URL
  previewUrl?: string; // 视频预览URL
  coverUrl?: string; // 视频封面URL
  url?: string; // 兼容字段，某些组件使用
  sources?: Array<{
    url: string;
    type: string;
    label: string;
    size: number;
  }>;
  subtitles?: Array<{
    url: string;
    label: string;
    srclang: string;
    default?: boolean;
  }>;
}

export interface VideoService {
  getVideos(
    page: number,
    limit: number,
    tag?: string
  ): Promise<{
    videos: VideoInfo[];
    hasMore: boolean;
  }>;

  getVideoById(id: string): Promise<VideoInfo>;

  getVideosByUser(
    userId: string,
    page?: number,
    limit?: number
  ): Promise<{
    videos: VideoInfo[];
    hasMore: boolean;
  }>;
}

// 视频列表查询参数
export interface VideoQueryParams {
  page?: number;
  pageSize?: number;
  category?: VideoCategory;
  tags?: string[];
  userId?: string;
  status?: VideoStatus;
  sortBy?: 'views' | 'likes' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// 视频上传参数
export interface VideoUploadParams {
  title: string;
  description: string;
  category: VideoCategory;
  tags: string[];
  file: File;
  thumbnail?: File;
}

export interface VideoUploadResponse {
  id: string;
  uploadUrl: string;
  thumbnailUploadUrl: string;
}

export interface VideoFilter {
  tags?: string[];
  userId?: string;
  status?: 'processing' | 'published' | 'failed';
  visibility?: 'public' | 'private' | 'unlisted';
  sortBy: 'views' | 'likes' | 'date';
  order: 'asc' | 'desc';
}

export interface VideoSearchResult {
  videos: VideoInfo[];
  total: number;
  page: number;
  pageSize: number;
}

// 视频质量选项
export type VideoQuality = '1080p' | '720p' | '480p' | '360p';

// 视频来源
export interface VideoSource {
  quality: VideoQuality;
  url: string;
  type: string;
}

// 视频表单数据
export interface VideoFormData {
  title: string;
  description: string;
  tags: string[];
  visibility: 'public' | 'private' | 'unlisted';
  coverUrl?: string;
  videoUrl?: string;
}

// 视频播放记录
export interface VideoProgress {
  videoId: string;
  currentTime: number;
  duration: number;
  percentage: number;
  lastPlayedAt: string;
}

// 视频搜索参数
export interface VideoSearchParams {
  keyword?: string;
  tags?: string[];
  sort?: 'latest' | 'popular' | 'relevant';
  page?: number;
  limit?: number;
}

// 视频列表响应
export interface VideoListResponse {
  videos: VideoInfo[];
  total: number;
  hasMore: boolean;
}

// 视频评论响应
export interface VideoCommentsResponse {
  comments: Comment[];
  total: number;
  hasMore: boolean;
}

// 视频推荐响应
export interface VideoRecommendationsResponse {
  videos: VideoInfo[];
  hasMore: boolean;
}

// 导出其他类型
export * from './index';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 统一Video类型扩展
export interface VideoWithThumbnail {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  publishedAt: string;
  description?: string;
  videoUrl?: string;
  likes?: number;
  favorites?: number;
  comments?: number;
  previewUrl?: string;
  tags?: string[];
  author: {
    id: string;
    name: string;
    username?: string;
    nickname?: string;
    avatar: string;
    verified?: boolean;
  };
}
