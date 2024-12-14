<script setup lang="ts">
import { ref, onMounted, onBeforeMount, defineEmits, defineProps } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import PlaylistList from '../components/playlists/PlaylistList.vue'
import PlaylistTracklist from '../components/playlists/PlaylistTracklist.vue'

const route = useRoute()

const emit = defineEmits(['getTrackTitle'])

let trackList = ref([])
let loading = ref(true)
let selectedPlaylistId = ref(null)

onMounted(() => {
  axios
    .get('https://pantagruweb.club/tentacules/webhook/babines/liked')
    .then((response) => {
      console.log(response.data)
      trackList.value = response.data
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

console.log(handlePlaylistId.value)
</script>

<template>
  <main>
    <Header />
    <PlaylistList @getPlaylistName="handlePlaylistName" @getPlaylistId="handlePlaylistId" />
    <Aside />
    <PlaylistTracklist
      :playlistName="selectedPlaylistName"
      :loading="loading.value"
      :id="selectedPlaylistId"
    />
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
