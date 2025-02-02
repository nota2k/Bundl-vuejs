import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GetVideoView from '@/views/GetVideoView.vue'
import AddVideoToPlaylistView from '@/views/AddVideoToPlaylistView.vue'

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
    },
    {
      path: '/add-video',
      name: 'addvideo',
      component: AddVideoToPlaylistView,
      props: true
    }
  ]
})

export default router
