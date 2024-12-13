<script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import axios from 'axios'
import router from '@/router'

const emit = defineEmits(['getTrackTitle', 'getPlaylistName'])

let playlists = ref([])
let loading = ref(true)

onMounted(() => {
  axios
    .get('https://pantagruweb.club/tentacules/webhook/getplaylist', {
      timeout: 10000
    }) // Augmentez le délai d'attente à 10 secondes
    .then((response) => {
      console.log(response.data)
      playlists.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des playlists:', error.message)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <div class="playlist-wrapper">
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div class="container">
        <h2>Playlists</h2>
        <ul>
          <li v-for="detail in playlists" :key="detail.id">
            <router-link :to="{ name: 'playlist', params: { id: detail.id } }">
              <button @click="emitPlaylist(detail.name)">{{ detail.name }}</button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playlist-wrapper {
  grid-column-start: 1;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5em 0;
  cursor: pointer;
}
</style>
