<script setup>
import { ref, onMounted, onBeforeMount, defineEmits, defineProps, watch } from 'vue'
import PlaylistTracklistItem from './PlaylistTracklistItem.vue'
import axios from 'axios'

const props = defineProps({
  id: String
})

let tracks = ref([])
let loading = ref(true)

const fetchTracks = async (id) => {
  if (!id) return
  loading.value = true
  try {
    const response = await axios.get(
      `https://pantagruweb.club/tentacules/webhook/b469b78f-40ba-437a-937d-48ba00985774?id=${id}`,
      {
        timeout: 10000
      }
    )
    tracks.value = response.data
    console.log(tracks.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des pistes:', error.message)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.id,
  (newId) => {
    fetchTracks(newId)
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="loading">Chargement...</div>
  <div class="tracklist-wrapper" v-else>
    <div class="container">
      <table class="">
        <thead class="">
          <tr>
            <th class="">
              <span>Titre</span>
            </th>
            <th class="">
              <span>Artiste</span>
            </th>
            <th class="">
              <span>Album</span>
            </th>
            <th class=""><span>Ajouté le</span></th>
            <th class=""><span> </span></th>
          </tr>
        </thead>

        <tbody>
          <PlaylistTracklistItem
            v-for="track in tracks"
            :key="track.track.id"
            :title="track.track.title"
            :artist="track.track.artist"
            :album="track.track.album"
            :added_at="track.track.added_at"
            @click="emitTrackTitle(track.title)"
            @emitTrackArtist="getPlaylistId(track.artist)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scope>
.container {
  margin: 0 auto;
}

.tracklist-wrapper {
  /* border: 2px solid black; */
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
