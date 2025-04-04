import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// 修改懒加载的写法，添加注释和错误处理
const Home = () =>
  import('@/views/Home.vue').catch(err => {
    console.error('Failed to load Home view:', err);
    return import('@/views/NotFound.vue');
  });
const Login = () => import('@/views/auth/Login.vue');
const Register = () => import('@/views/auth/Register.vue');
const VerifyEmail = () => import('@/views/auth/VerifyEmail.vue');
const Profile = () => import('@/views/Profile.vue');
const Settings = () => import('@/views/Settings.vue');
const VideoUpload = () => import('@/views/video/Upload.vue');
const VideoDetail = () => import('@/views/VideoDetail.vue');
const NotFound = () => import('@/views/NotFound.vue');
const ForgotPassword = () => import('@/views/auth/ForgotPassword.vue');
const ResetPassword = () => import('@/views/auth/ResetPassword.vue');
const TagDetail = () => import('@/views/TagDetail.vue');
const Trending = () => import('@/views/Trending.vue');
const Subscriptions = () => import('@/views/Subscriptions.vue');
const Library = () => import('@/views/Library.vue');
const History = () => import('@/views/History.vue');

// 使用哈希路由模式
const history = createWebHashHistory();

// 路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '首页' },
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/login',
    component: () => import('@/views/auth/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: { title: '登录', guest: true },
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: { title: '注册', guest: true },
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { title: '个人资料', requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { title: '设置', requiresAuth: true },
  },
  {
    path: '/trending',
    name: 'Trending',
    component: Trending,
    meta: {
      title: '热门',
    },
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: Subscriptions,
    meta: {
      title: '订阅',
      requiresAuth: true,
    },
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
    meta: {
      title: '媒体库',
      requiresAuth: true,
    },
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      title: '历史记录',
      requiresAuth: true,
    },
  },
  {
    path: '/auth/verify-email',
    name: 'VerifyEmail',
    component: VerifyEmail,
    meta: {
      title: '验证邮箱',
      guest: true,
    },
  },
  {
    path: '/video/upload',
    name: 'VideoUpload',
    component: VideoUpload,
    meta: {
      title: '上传视频',
      requiresAuth: true,
    },
  },
  {
    path: '/video/:id',
    name: 'VideoDetail',
    component: VideoDetail,
    meta: {
      title: '视频详情',
    },
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: '忘记密码',
      guest: true,
    },
  },
  {
    path: '/auth/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      title: '重置密码',
      guest: true,
    },
  },
  {
    path: '/tag/:id',
    name: 'TagDetail',
    component: TagDetail,
    meta: {
      title: '标签详情',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到',
    },
  },
];

// 创建路由实例
const router = createRouter({
  history,
  routes,
});

// 添加全局错误处理
router.onError(error => {
  console.error('Router error:', error);
});

// 导航守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Atom Video` : 'Atom Video';

  // 检查认证状态
  if (!authStore.isAuthenticated && authStore.token) {
    await authStore.checkAuth();
  }

  // 需要认证的路由
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }

  // 游客专属路由（已登录用户不能访问）
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/');
    return;
  }

  next();
});

export default router;
