<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import PlaylistsComponent from '@/components/PlaylistsComponent.vue'
import AllTracksComponent from '@/components/AllTracksComponent.vue'

const route = useRoute()

let tracksInplaylists = ref([])
let loading = ref(true)
let id = route.params.id
// console.log(route.params.id)
const fetchPlaylistDetails = (id) => {
  axios
    .get(
      `https://pantagruweb.club/tentacules/webhook/b469b78f-40ba-437a-937d-48ba00985774?id=${id}`,
      { timeout: 10000 }
    )
    .then((response) => {
      console.log(response.data)
      tracksInplaylists.value = response.data
      // console.log(playlists)
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des détails de la playlist:', error.message)
    })
    .finally(() => {
      loading.value = false
    })
}

const exportToJson = () => {
  const jsonData = JSON.stringify(tracksInplaylists.value, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'playlist.json'
  a.click()
  URL.revokeObjectURL(url)
}

const emit = defineEmits(['getTrackTitle'])

const emitTrackTitle = (title) => {
  emit('getTrackTitle', title)
}

onMounted(() => {
  if (route.params.id) {
    fetchPlaylistDetails(route.params.id)
  } else {
    console.error('ID de la playlist non fourni')
  }
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loading.value = true
      fetchPlaylistDetails(newId)
    }
  }
)
</script>

<template>
  <main>
    <Header />
    <PlaylistsComponent />
    <Aside @exportJson="exportToJson" />
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div class="container">
        <table class="">
          <thead class="">
            <tr>
              <th class="">
                <span>Artiste</span>
              </th>
              <th class="">
                <span>Album</span>
              </th>
              <th class="">
                <span>Titre</span>
              </th>
              <th class=""><span>Ajouté le</span></th>
              <th class=""><span> </span></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="detail in tracksInplaylists" :key="detail.id">
              <th>
                {{ detail.track.artist }}
              </th>
              <td class="">
                {{ detail.track.album }}
              </td>
              <td class="">
                {{ detail.track.title }}
              </td>
              <td class="">
                {{ detail.track.added_at }}
              </td>
              <td class="to-youtube">
                <router-link
                  :to="{ name: 'getvideo', params: { title: detail.track.title } }"
                  class="yt"
                >
                  <button class="yt" @click="emitTrackTitle(detail.track.title)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-youtube"
                    >
                      <path
                        d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
                      />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<style scope>
.container {
  margin: 0 auto;
}

table {
  margin: 0 auto;
  background-color: white;
  padding: 2em;
  width: 100%;
  box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

thead tr {
  text-align: left;
  font-weight: bold;
  line-height: 3em;
}

tbody th {
  text-align: left;
  font-weight: normal;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

button {
  appearance: none;
  box-shadow: none;
  background: none;
  border: none;
}

.to-youtube {
  display: inline-flex;
  justify-content: center;
  width: 100%;
}
</style>
