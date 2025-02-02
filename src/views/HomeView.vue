<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Header from '@/components/TheHeader.vue'
import Aside from '@/components/Aside.vue'
import PlaylistList from '@/components/playlists/PlaylistList.vue'
import PlaylistTracklist from '@/components/playlists/PlaylistTracklist.vue'

const route = useRoute()

const emit = defineEmits(['getTrackTitle'])

interface Track {
  playlist_id: string;
  // add other properties if needed
}

let trackList = ref<Track[]>([])
let loading = ref(true)
let selectedPlaylistId = ref<string | undefined>(undefined)

onMounted(() => {
  axios
    .get('https://pantagruweb.club/tentacules/webhook/babines/liked')
    .then((response) => {
      // console.log(response.data)
      trackList.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
})

const handlePlaylistId = (id: string) => {
  if (!id) {
    id = trackList.value[0].playlist_id
  } else {
    selectedPlaylistId.value = id
  }
}

let selectedPlaylistName = ref('')

const handlePlaylistName = (name: string) => {
  selectedPlaylistName.value = name
}

const handleCache = () => {
  axios
    .get('https://pantagruweb.club/tentacules/webhook/babines/liked?cache=false')
    .then((response) => {
      trackList = response.data

      console.log(trackList)
    })
}
</script>

<template>
  <main>
    <Header />
    <PlaylistList @getPlaylistName="handlePlaylistName" @getPlaylistId="handlePlaylistId" />
    <div class="youtube-to-spotify">
      <div class="container flex column">
        <div class="img-wrapper">
          <img class="os" src="../assets/os.svg" alt="os" />
        </div>
        <p>Youtube</p>
      </div>
    </div>
    <Aside @clearCache="handleCache()" />
    <PlaylistTracklist
      :playlistName="selectedPlaylistName"
      :loading="loading"
      :id="selectedPlaylistId"
    />
  </main>
</template>
<style scope>
.container {
  margin: 0 auto;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex.column {
  flex-direction: column;
}

.tracklist-wrapper {
  border: 2px solid black;
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

.youtube-to-spotify {
  grid-column-start: 1;
  grid-row-start: 3;
  width: 100%;
  height: 100%;
  background: var(--yellow);
  padding: 1em;
  border: 2px solid black;
  box-sizing: border-box;
}

.os {
  width: 100%;
  height: 100%;
}

.img-wrapper {
  width: -moz-available;
  max-width: 180px;
}
</style>
