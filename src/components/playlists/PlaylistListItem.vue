<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['getPlaylistId', 'getPlaylistName'])

const props = defineProps({
  playlist: Object,
  id: String,
  name: String
})

function emitPlaylist(id: string, name: string) {
  emit('getPlaylistId', id)
  emit('getPlaylistName', name)
}
</script>

<template>
  <li class="playlist-item" @click="emitPlaylist(props.id ?? '', props.name ?? '')">
    {{ props.name }}
  </li>
</template>

<style scoped>
.playlist-wrapper {
  grid-column-start: 1;
}

.close {
  width: 50px;
  height: 50px;
  background-color: var(--yellow);
  display: none;
  position: absolute;
  right: -45px;
  z-index: 50;
  transform-origin: left;
  border-radius: 0 40px 40px 0;
}

@media screen and (max-width: 768px) {
  .playlist-wrapper {
    position: fixed;
    transform: translateX(-100%);
    top: 130px;
  }

  .close {
    display: block;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  max-height: 70vh;
  position: relative;
}

h2 {
  width: -moz-available;
  margin-bottom: 0;
  position: sticky;
  top: 0;
  background: white;
  padding: 1em;
  left: 0;
  border-bottom: 2px solid black;
  margin-top: 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 0;
  overflow: scroll;
}

li {
  margin: 0;
  padding: 10px;
  cursor: pointer;
}

li:nth-child(odd) {
  background: #f9f9f9;
}

li {
  text-decoration: none;
  color: black;
  transition: 0.2s ease-in-out all;
  margin-left: 0;
}

@media (hover: hover) {
  li:hover {
    background-color: var(--yellow);
    font-weight: 500;
    margin-left: 5px;
  }
}
</style>
