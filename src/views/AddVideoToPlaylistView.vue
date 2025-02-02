<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Header from '@/components/TheHeader.vue'
import Aside from '@/components/Aside.vue'
import PlaylistList from '@/components/playlists/PlaylistList.vue'
import AddVideoToPlaylist from '@/components/youtube/AddVideoToPlaylist.vue'
import { videos } from '@/stores/store.ts'

const route = useRoute()
const selectedVideoId = ref(route.params.videoId)
const playlistsYT = ref([])

onMounted(() => {
  axios
    .post(
      `https://pantagruweb.club/tentacules/webhook/addvideotoyoutube?part=snippet&id=${videos.id}`
    )
    .then((response) => {
      console.log(response.data)
      videoData.value = response.data
    })
})
</script>

<template>
  <main>
    <Header />
    <PlaylistList @getPlaylistName="handlePlaylistName" @getPlaylistId="handlePlaylistId" />
    <Aside />
    <AddVideoToPlaylist :video="selectedVideoId" @change="playlistsYT" />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .italic {
    font-style: italic;
  }

  .wrapper {
    background-color: white;
    padding: 3em;
    border-radius: 10px;
    border: 2px solid black;
  }

  .about {
    min-height: 100vh;
    display: flex;
    align-items: center.;
  }

  .list-video {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }

  .video-wrapper {
    flex-grow: 2;
  }

  .thumbnail {
    position: relative;
  }

  .choose-video {
    width: 30px;
    height: 30px;
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    border: 2px solid black;
    background: #fff;
    appearance: none;
    cursor: pointer;
  }

  input[type='radio']:checked {
    background: var(--yellow);
    color: red;
  }

  input[type='radio']:checked::before {
    content: '';
    display: flex;
    height: 2px;
    width: 30px;
    background-color: black;
    position: absolute;
    left: -2px;
    top: 12px;
    rotate: 45deg;
  }

  input[type='radio']:checked::after {
    content: '';
    display: flex;
    height: 2px;
    width: 30px;
    background-color: black;
    position: absolute;
    right: -2px;
    top: 12px;
    rotate: -45deg;
  }
}

.back {
  padding: 5px 20px;
  margin-bottom: 1em;
  display: flex;
  gap: 10px;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
}

.back::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #000;
}

.back:hover {
  background-color: black;
  color: #fff;
}

.back:hover::before {
  border-right-color: #fff;
}

.next {
  padding: 9px 25px;
  border: 2px solid black;
  min-width: 140px;
  font-size: 1.2em;
  text-align: left;
  float: right;
  cursor: pointer;
  position: relative;
}

.next {
  padding: 9px 25px;
  border: 2px solid black;
  min-width: 140px;
  font-size: 1.2em;
  text-align: left;
  float: right;
  cursor: pointer;
  position: relative;
  border-radius: 2px;
}

.griffes {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -19px;
  right: 0;
}

.griffes::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  left: 0;
}

.next::after {
  content: '';
  display: block;
  max-width: 50px;
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  left: 64%;
  top: 0;
  transition: 0.2s ease-in-out all;
  transform-origin: left;
}
.next:hover {
  background-color: var(--yellow);
}

.next:hover::after {
  width: 0%;
  background: var(--yellow);
}
</style>
