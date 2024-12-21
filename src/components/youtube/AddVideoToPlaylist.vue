<script setup>
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const props = defineProps(['video']) // Définir la prop 'video'
const route = useRoute()

let selectedVideo = ref(route.params.videoId)
let selectedPlaylistId = ref(route.params.playlistId)

onMounted(() => {
  axios
    .post(
      `https://pantagruweb.club/tentacules/webhook-test/addvideotoyoutube?part=snippet&id=${selectedPlaylistId}` // Utiliser la prop 'video'
    )
    .then((response) => {
      //  console.log(response.data)
      videoData.value = response.data
    })
})
</script>

<template>
  <div class="wrapper">
    <button class="back" @click="$router.go(-1)">Retour</button>
    <div class="content">
      <h1>
        Vidéo pour <span class="italic">{{ props.video }}</span>
      </h1>
      <div class="container">
        <div class="list-video">
          <div class="video-wrapper">
            <div class="thumbnail">
              <iframe
                :src="`https://www.youtube.com/embed/${props.video}`"
                width="560"
                height="315"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="next">Suivant<img class="griffes" src="../assets/griffes.svg" /></button>
  </div>
</template>

<style scoped></style>
