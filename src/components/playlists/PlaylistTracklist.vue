<script setup lang="ts">
import { ref, onMounted, onBeforeMount, defineEmits, defineProps, watch } from 'vue'
import PlaylistTracklistItem from './PlaylistTracklistItem.vue'
import axios from 'axios'
import addTrackManually from '../addTrackManually.vue'
import { videos } from '@/stores/store'
import AddTrackManually from '../addTrackManually.vue'

const props = defineProps({
  id: String,
  playlistName: String
})

interface Track {
  track: {
    id: string;
    title: string;
    artist: string;
    album: string;
    added_at: string;
  }
}

let tracks = ref<Track[]>([])
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

const fetchTracks = async (id: string) => {
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
    console.error('Erreur lors de la récupération des pistes:', (error as any).message)
  } finally {
    loading.value = false
  }
}

const sortTracksByArtist = (event: Event) => {
  tracks.value.sort((a, b) => {
    if (a.track.artist.toLowerCase() < b.track.artist.toLowerCase())
      return isSortedAsc.value ? -1 : 1
    if (a.track.artist.toLowerCase() > b.track.artist.toLowerCase())
      return isSortedAsc.value ? 1 : -1
    return 0
  })
  isSorted.value = true
  isSortedAsc.value = !isSortedAsc.value
  if (event.target) {
    sortedBy.value = (event.target as HTMLElement).getAttribute('data-value') || ''
    const target = event.target as HTMLElement | null;
    if (target) {
      target.setAttribute('data-value', isSortedAsc.value.toString());
    }
  }
}

const sortTracksByTitle = (event: Event) => {
  tracks.value.sort((a, b) => {
    if (a.track.title.toLowerCase() < b.track.title.toLowerCase()) return isSortedAsc.value ? -1 : 1
    if (a.track.title.toLowerCase() > b.track.title.toLowerCase()) return isSortedAsc.value ? 1 : -1
    return 0
  })
  isSorted.value = true
  isSortedAsc.value = !isSortedAsc.value
  sortedBy.value = (event.target as HTMLElement).getAttribute('data-value') || ''
  ;(event.target as HTMLElement).setAttribute('data-value', isSortedAsc.value.toString())
}

const sortTracksByAdded = (event: Event) => {
  tracks.value.sort((a, b) => {
    if (a.track.added_at.toLowerCase() < b.track.added_at.toLowerCase())
      return isSortedAsc.value ? -1 : 1
    if (a.track.added_at.toLowerCase() > b.track.added_at.toLowerCase())
      return isSortedAsc.value ? 1 : -1
    return 0
  })
  isSorted.value = true
  isSortedAsc.value = !isSortedAsc.value
  const target = event.target as HTMLElement | null;
  if (target) {
    sortedBy.value = target.getAttribute('data-value') || '';
    target.setAttribute('data-value', isSortedAsc.value.toString());
  }
}

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      fetchTracks(newId)
    }
  },
  { immediate: true }
)
const getPlaylistId = (artist: string) => {
  console.log(`Artist: ${artist}`)
}

const emitTrackTitle = (title: string) => {
  console.log(`Track Title: ${title}`)
}

</script>

<template>
  <!-- <div v-if="loading">Chargement...</div> -->
  <div class="tracklist-wrapper">
    <div class="container">
      <AddTrackManually />
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
            @click="emitTrackTitle(track.track.title)"
            @emitTrackArtist="getPlaylistId(track.track.artist)"
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
  grid-row: 2 / 7;
}

table {
  margin: 0 auto;
  padding: 2em;
  width: 100%;
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
