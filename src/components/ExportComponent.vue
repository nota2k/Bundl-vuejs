<script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['getPlaylistId'])
</script>

<template>
  <div class="playlist-wrapper">
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div class="container">
        <h2>Playlists</h2>
        <ul>
          <li v-for="detail in playlists" :key="detail.id">
            <router-link
              :to="{ name: 'playlist', params: { id: detail.id } }"
              @click="emitPlaylist(detail.id)"
              >{{ detail.name }}
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

h2 {
  width: 80%;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 80%;
}

li {
  margin: 0.5em 0;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: black;
}
</style>
