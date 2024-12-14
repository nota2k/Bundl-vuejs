<script setup>
import { ref, onMounted, computed, defineEmits } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import PlaylistList from '@/components/playlists/PlaylistList.vue'

let listVideo = ref([])

const route = useRoute()
const trackTitle = decodeURIComponent(route.params.title)
const trackArtist = decodeURIComponent(route.params.artist)
const selectedFilter = ref(null)
let loading = ref(true)
let selectedPlaylistId = ref(null)

const emit = defineEmits(['getSelection'])

onMounted(() => {
  axios
    .get(
      `https://pantagruweb.club/tentacules/webhook/searchvideos?part=snippet&maxResults=5&type=video&q=${encodeURIComponent(trackTitle + ' ' + trackArtist)}`
    )
    .then((response) => {
      console.log(response.data[0].items)
      listVideo.value = response.data[0].items
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

const handleSelection = () => {
  emit('getSelection', selectedFilter.value)
}
</script>

<template>
  <main>
    <Header />
    <PlaylistList @getPlaylistName="handlePlaylistName" @getPlaylistId="handlePlaylistId" />
    <Aside />
    <div class="wrapper">
      <button class="back" @click="$router.go(-1)">Retour</button>
      <div class="content">
        <h1>
          Vidéo pour <span class="italic">{{ trackTitle }}</span>
        </h1>

        <div class="infos-search">
          <p><strong>Titre : </strong>{{ trackTitle }}</p>
          <p><strong>Artiste : </strong>{{ trackArtist }}</p>
        </div>
        <div class="container">
          <p>Résultat de la recherche</p>
          <div class="list-video">
            <div v-for="video in listVideo" class="video-wrapper">
              <p>{{ video.snippet.title }}</p>
              <div class="thumbnail">
                <iframe
                  :src="`https://www.youtube.com/embed/${video.etag}`"
                  width="560"
                  height="315"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <input
                  class="choose-video"
                  type="radio"
                  :value="video.id.videoId"
                  v-model="selectedFilter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="handleSelection" class="next">
        Suivant<img class="griffes" src="../assets/griffes.svg" />
      </button>
    </div>
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
    background: var(--yellow);
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
