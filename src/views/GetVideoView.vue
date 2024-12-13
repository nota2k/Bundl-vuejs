<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import PlaylistsComponent from '@/components/PlaylistsComponent.vue'

let listVideo = ref([])

const route = useRoute()
const trackTitle = route.params.title
const selectedFilter = ref([])
onMounted(() => {
  axios
    .get(`https://pantagruweb.club/tentacules/webhook/searchvideos?title=${trackTitle}`)
    .then((response) => {
      console.log(response.data)
      listVideo.value = response.data
    })
})

console.log(listVideo.value)
</script>

<template>
  <main>
    <Header />
    <PlaylistsComponent />
    <Aside @exportJson="exportToJson" />
    <div class="wrapper">
      <div class="">
        <div class="">
          <p>Titre</p>
          <p>{{ trackTitle }}</p>
          <p>Artiste</p>
          <p>{{ trackTitle }}</p>
          <p>Durée</p>
        </div>
        <div class="container">
          <p>Résultat de la recherche</p>
          <div v-for="video in listVideo" :key="video.id.videoId" class="video-wrapper">
            <label>
              <p>{{ video.snippet.title }}</p>
              <div class="thumbnail">
                <img :src="video.snippet.thumbnails.medium.url" alt="thumbnail" />
              </div>
              <input type="submit" value="video.id.videoId" v-model="selectedFilter" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>Vidéo pour {{ trackTitle }}</h1>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .wrapper {
    background-color: white;
    padding: 3em;
    border-radius: 10px;
  }
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center.;
  }
}
</style>
