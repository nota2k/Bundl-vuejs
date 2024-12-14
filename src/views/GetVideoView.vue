<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import PlaylistList from '@/components/playlists/PlaylistList.vue'

let listVideo = ref([])

const route = useRoute()
const trackTitle = decodeURIComponent(route.params.title)
const trackArtist = decodeURIComponent(route.params.artist)
const selectedFilter = ref([])
let loading = ref(true)
let selectedPlaylistId = ref(null)

onMounted(() => {
  axios
    .get(
      `https://pantagruweb.club/tentacules/webhook/searchvideos?part=snippet&maxResults=5&type=video&q=${encodeURIComponent(trackTitle + ' ' + trackArtist)}`
    )
    .then((response) => {
      console.log(response.data[0].items)
      listVideo.value = response.data[0].items
    })
    .finally(() => {
      loading.value = false
    })
})
const handlePlaylistId = (id) => {
  selectedPlaylistId.value = id
}

let selectedPlaylistName = ref('')

const handlePlaylistName = (name) => {
  selectedPlaylistName.value = name
}
</script>

<template>
  <main>
    <Header />
    <PlaylistList @getPlaylistName="handlePlaylistName" @getPlaylistId="handlePlaylistId" />
    <Aside />
    <div class="wrapper">
      <div class="">
        <h1>Vidéo pour {{ trackTitle }}</h1>

        <div class="">
          <p><strong>Titre : </strong>{{ trackTitle }}</p>
          <p><strong>Artiste : </strong>{{ trackArtist }}</p>
        </div>
        <div class="container">
          <p>Résultat de la recherche</p>
          <div v-for="video in listVideo" class="video-wrapper">
            <label>
              <p>{{ video.snippet.title }}</p>
              <div class="thumbnail">
                <iframe
                  :src="`https://www.youtube.com/embed/${video.etag}`"
                  width="560"
                  height="315"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <input type="submit" value="video.id.videoId" v-model="selectedFilter" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div></div>
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
