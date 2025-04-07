/**
 * @file useVideo.ts
 * @description 视频相关的组合式函数
 * @author Atom Video Team
 * @date 2025-04-06
 */

import { ref, computed } from 'vue';
import { useVideoStore } from '@/stores/video';
import type { Video, VideoQueryParams, VideoUploadParams } from '@/types/video';

export function useVideo() {
  const videoStore = useVideoStore();
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 获取视频列表
  const fetchVideos = async (params: VideoQueryParams) => {
    try {
      loading.value = true;
      error.value = null;
      await videoStore.fetchVideos(params);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取视频列表失败';
    } finally {
      loading.value = false;
    }
  };

  // 获取视频详情
  const fetchVideoById = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;
      await videoStore.fetchVideoById(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取视频详情失败';
    } finally {
      loading.value = false;
    }
  };

  // 上传视频
  const uploadVideo = async (params: VideoUploadParams) => {
    try {
      loading.value = true;
      error.value = null;
      await videoStore.uploadVideo(params);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '上传视频失败';
    } finally {
      loading.value = false;
    }
  };

  // 删除视频
  const deleteVideo = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;
      await videoStore.deleteVideo(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '删除视频失败';
    } finally {
      loading.value = false;
    }
  };

  // 点赞视频
  const likeVideo = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;
      await videoStore.likeVideo(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '点赞视频失败';
    } finally {
      loading.value = false;
    }
  };

  // 收藏视频
  const favoriteVideo = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;
      await videoStore.favoriteVideo(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '收藏视频失败';
    } finally {
      loading.value = false;
    }
  };

  // 获取推荐视频
  const fetchRecommendedVideos = async () => {
    try {
      loading.value = true;
      error.value = null;

      // 模拟API调用，生成假数据
      await new Promise(resolve => setTimeout(resolve, 800));

      return Array(8)
        .fill(0)
        .map((_, index) => ({
          id: `rec-${index}`,
          title: `推荐视频 ${index + 1}`,
          thumbnailUrl: `https://picsum.photos/seed/rec${index}/400/225`,
          duration: Math.floor(Math.random() * 600),
          views: Math.floor(Math.random() * 100000),
          publishedAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          author: {
            id: `author-${index % 5}`,
            name: `创作者 ${index % 5}`,
            avatar: `https://i.pravatar.cc/150?u=author${index % 5}`,
          },
        }));
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取推荐视频失败';
      return [];
    } finally {
      loading.value = false;
    }
  };

  // 获取热门视频
  const fetchTrendingVideos = async () => {
    try {
      loading.value = true;
      error.value = null;

      // 模拟API调用，生成假数据
      await new Promise(resolve => setTimeout(resolve, 800));

      return Array(8)
        .fill(0)
        .map((_, index) => ({
          id: `trend-${index}`,
          title: `热门视频 ${index + 1}`,
          thumbnailUrl: `https://picsum.photos/seed/trend${index}/400/225`,
          duration: Math.floor(Math.random() * 600),
          views: Math.floor(Math.random() * 1000000),
          publishedAt: new Date(
            Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000
          ).toISOString(),
          author: {
            id: `author-${index % 5}`,
            name: `创作者 ${index % 5}`,
            avatar: `https://i.pravatar.cc/150?u=creator${index % 5}`,
          },
        }));
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取热门视频失败';
      return [];
    } finally {
      loading.value = false;
    }
  };

  // 获取最新视频
  const fetchLatestVideos = async () => {
    try {
      loading.value = true;
      error.value = null;

      // 模拟API调用，生成假数据
      await new Promise(resolve => setTimeout(resolve, 800));

      return Array(8)
        .fill(0)
        .map((_, index) => ({
          id: `latest-${index}`,
          title: `最新视频 ${index + 1}`,
          thumbnailUrl: `https://picsum.photos/seed/latest${index}/400/225`,
          duration: Math.floor(Math.random() * 600),
          views: Math.floor(Math.random() * 50000),
          publishedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            id: `author-${index % 5}`,
            name: `创作者 ${index % 5}`,
            avatar: `https://i.pravatar.cc/150?u=new${index % 5}`,
          },
        }));
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取最新视频失败';
      return [];
    } finally {
      loading.value = false;
    }
  };

  // 计算属性
  const videos = computed(() => videoStore.videos);
  const currentVideo = computed(() => videoStore.currentVideo);
  const totalVideos = computed(() => videoStore.totalVideos);

  return {
    loading,
    error,
    videos,
    currentVideo,
    totalVideos,
    fetchVideos,
    fetchVideoById,
    uploadVideo,
    deleteVideo,
    likeVideo,
    favoriteVideo,
    fetchRecommendedVideos,
    fetchTrendingVideos,
    fetchLatestVideos,
  };
}
