<script setup>
import { ref, onMounted, onBeforeMount, defineEmits, defineProps, watch } from 'vue'
import PlaylistTracklistItem from './PlaylistTracklistItem.vue'
import axios from 'axios'

const props = defineProps({
  id: String,
  playlistName: String
})

let tracks = ref([])
let loading = ref(true)
let isSorted = ref(false)
let isSortedAsc = ref(true)
let sortedBy = ref('')

// let trackList = ref([])

onMounted(() => {
  axios
    .get('https://pantagruweb.club/tentacules/webhook/babines/liked')
    .then((response) => {
      tracks.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
})
console.log(tracks.value)

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
    isSorted.value = false
  } catch (error) {
    console.error('Erreur lors de la récupération des pistes:', error.message)
  } finally {
    loading.value = false
  }
}

const sortTracksByArtist = (event) => {
  tracks.value.sort((a, b) => {
    if (a.track.artist.toLowerCase() < b.track.artist.toLowerCase())
      return isSortedAsc.value ? -1 : 1
    if (a.track.artist.toLowerCase() > b.track.artist.toLowerCase())
      return isSortedAsc.value ? 1 : -1
    return 0
  })
  isSorted.value = true
  isSortedAsc.value = !isSortedAsc.value
  sortedBy.value = event.target.getAttribute('data-value')
  event.target.setAttribute('data-value', isSortedAsc.value)
}

const sortTracksByTitle = (event) => {
  tracks.value.sort((a, b) => {
    if (a.track.title.toLowerCase() < b.track.title.toLowerCase()) return isSortedAsc.value ? -1 : 1
    if (a.track.title.toLowerCase() > b.track.title.toLowerCase()) return isSortedAsc.value ? 1 : -1
    return 0
  })
  isSorted.value = true
  isSortedAsc.value = !isSortedAsc.value
  sortedBy.value = event.target.getAttribute('data-value')
  event.target.setAttribute('data-value', isSortedAsc.value)
}

const sortTracksByAdded = (event) => {
  tracks.value.sort((a, b) => {
    if (a.track.added_at.toLowerCase() < b.track.added_at.toLowerCase())
      return isSortedAsc.value ? -1 : 1
    if (a.track.added_at.toLowerCase() > b.track.added_at.toLowerCase())
      return isSortedAsc.value ? 1 : -1
    return 0
  })
  isSorted.value = true
  isSortedAsc.value = !isSortedAsc.value
  sortedBy.value = event.target.getAttribute('data-value')
  event.target.setAttribute('data-value', isSortedAsc.value)
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
  <!-- <div v-if="loading">Chargement...</div> -->
  <div class="tracklist-wrapper">
    <div class="container">
      <h2 class="playlist-name">
        {{ props.playlistName ? props.playlistName : 'Tous mes morceaux' }}
      </h2>
      <table class="">
        <thead class="">
          <tr>
            <th class="">
              <span>Titre</span>
              <button class="filter" @click="sortTracksByTitle" data-value="true">
                <img src="../../assets/arrow-down.svg" />
              </button>
            </th>
            <th class="">
              <span>Artiste</span>
              <button class="filter" @click="sortTracksByArtist" data-value="true">
                <img src="../../assets/arrow-down.svg" />
              </button>
            </th>
            <th class="">
              <span>Album</span>
              <button class="filter" @click="sortTracksByArtist" data-value="true">
                <img src="../../assets/arrow-down.svg" />
              </button>
            </th>
            <th class="">
              <span>Ajouté le</span>
              <button class="filter" @click="sortTracksByAdded" data-value="true">
                <img src="../../assets/arrow-down.svg" />
              </button>
            </th>
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

.playlist-name {
  padding: 26px;
  background-color: var(--yellow);
  margin: 0;
  border-bottom: 2px solid black;
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

.filter {
  top: 3px;
  position: relative;
  cursor: pointer;
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

.filter img {
  width: 14px;
  margin-left: 10px;
}

.filter img[data-value='true'] {
  transform: rotate(180deg);
}
</style>
