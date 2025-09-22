import { createRouter, createWebHistory } from 'vue-router'
import GameView from '@/views/GameView.vue'
import ProgressBarDemo from '@/views/ProgressBarDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView,
    },
    {
      path: '/demo',
      name: 'progressbar-demo',
      component: ProgressBarDemo,
    },
  ],
})

export default router
