import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GetVideoView from '../views/GetVideoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/getvideo/:title&:artist',
      name: 'getvideo',
      component: GetVideoView,
      props: true
    }
  ]
})

export default router
