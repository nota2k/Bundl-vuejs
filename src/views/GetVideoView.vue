<script setup>
import axios from 'axios'
import { ref, onMounted, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

let listVideo = ref([])

const props = defineProps({
  trackTitle: String
})

onMounted(() => {
  axios
    .get('https://pantagruweb.club/tentacules/webhook/49296f58-136d-4a67-a320-f16e9da7ba33')
    .then((response) => {
      console.log(response.data)
      listVideo.value = response.data
    })
})
// console.log(listVideo)
const filteredVideos = computed(() => {
  if (selectedFilter.value === 'all') {
    return listVideo.value
  }
  return listVideo.value.filter((video) => video.category === selectedFilter.value)
})

console.log(trackTitle)
</script>
<template>
  <div class="wrapper">
    <div class="">
      <div class="">
        <p>Titre</p>
        <p>Artiste</p>
        <p>Durée</p>
      </div>
      <div class="container">
        <p>Résultat de la recherche</p>
        <div v-for="video in listVideo" :key="video.id" class="video-wrapper">
          <label>
            <input type="submit" value="video.id" v-model="selectedFilter" />
            <iframe
              v-for="video in filteredVideos"
              :key="video.id"
              :src="video.url"
              frameborder="0"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .wrapper {
    background-color: white;
    padding: 3em;
    border-radius: 10px;
  }
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
