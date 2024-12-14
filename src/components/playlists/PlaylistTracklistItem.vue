<script setup>
import { ref, onMounted, onBeforeMount, defineEmits, defineProps } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: String,
  artist: String,
  album: String,
  added_at: String
})
</script>

<template>
  <tr>
    <td class="title">
      {{ props.title }}
    </td>
    <th>
      {{ props.artist }}
    </th>
    <td class="album">
      {{ props.album }}
    </td>
    <td class="added">
      {{ props.added_at }}
    </td>
    <td class="to-youtube">
      <!-- <router-link :to="{ name: 'getvideo', params: { title: props.title } }" class="yt">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-youtube"
        >
          <path
            d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
          />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      </router-link> -->
    </td>
  </tr>
</template>

<style scope>
.container {
  margin: 0 auto;
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
