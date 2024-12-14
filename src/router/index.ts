import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GetVideoView from '../views/GetVideoView.vue'
import SinglePlaylistView from '../views/SinglePlaylistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/getvideo/:title',
      name: 'getvideo',
      component: GetVideoView,
      props: true
    },
    {
      path: '/getplaylists',
      name: 'getplaylists',
      component: SinglePlaylistView
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: SinglePlaylistView
    }
  ]
})

export default router
