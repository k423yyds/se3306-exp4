import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useBlogStore } from '@/stores/blog'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts/:id(\\d+)',
      name: 'post-detail',
      component: () => import('@/views/PostDetailView.vue'),
    },
    {
      path: '/new',
      name: 'post-new',
      component: () => import('@/views/PostNewView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// 导航守卫：进入文章详情页时累加一次浏览量
router.beforeEach((to) => {
  if (to.name === 'post-detail') {
    const id = Number(to.params.id)
    if (Number.isFinite(id)) useBlogStore().viewPost(id)
  }
  return true
})

export default router
