<script setup lang="ts">
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

// const emitPlaylist = (name) => {
//   emit('getPlaylistName', name)
// }
</script>

<template>
  <main>
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div class="container">
        <table class="">
          <thead class="">
            <tr>
              <th class="">
                <span>Artiste</span>
                <MoveDown :size="15" />
              </th>
              <th class="">
                <span>Album</span>
                <MoveDown :size="15" />
              </th>
              <th class="">
                <span>Titre</span>
                <MoveDown :size="15" />
              </th>
              <th class=""><span>Ajouté le</span></th>
              <th class=""><span> </span></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="detail in playlists" :key="detail.id">
              <th>
                <router-link :to="{ name: 'playlist', params: { id: detail.id } }">
                  <button @click="emitPlaylist(detail.name)">{{ detail.name }}</button>
                </router-link>
              </th>
              <td class="">
                {{ detail.description }}
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
