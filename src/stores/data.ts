import { defineStore } from 'pinia'
import axios from 'axios'

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    playlists: [], // Liste des playlists
    currentPlaylist: null, // Playlist sélectionnée (détails)
    currentPlaylistId: '', // Identifiant de la playlist sélectionnée
    loading: false // Indicateur de chargement
  }),
  actions: {
    // Récupérer toutes les playlists
    async fetchPlaylists() {
      this.loading = true
      try {
        const response = await axios.get('https://pantagruweb.club/tentacules/webhook/getplaylist')
        this.playlists = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des playlists :', error)
      } finally {
        this.loading = false
      }
    },

    async fetchLikedTracks() {
      this.loading = true
      try {
        const response = await axios.get(
          'https://pantagruweb.club/tentacules/webhook/babines/liked'
        )
        this.playlists = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des playlists :', error)
      } finally {
        this.loading = false
      }
    },
    // Charger une playlist spécifique via son ID
    async fetchPlaylistById(id) {
      this.loading = true
      try {
        const response = await axios.get(
          `https://pantagruweb.club/tentacules/webhook/b469b78f-40ba-437a-937d-48ba00985774?id=${id}`
        )
        this.currentPlaylist = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération de la playlist :', error)
      } finally {
        this.loading = false
      }
    },
    // Charger les pistes d'une playlist spécifique via son ID
    async fetchTracksByPlaylist(id) {
      this.loading = true
      console.log('fetchTracksByPlaylist', id)
      try {
        const response = await axios.get(
          `https://pantagruweb.club/tentacules/webhook/b469b78f-40ba-437a-937d-48ba00985774?id=${id}`
        )
        this.currentPlaylistId = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des pistes de la playlist :', error)
      } finally {
        this.loading = false
      }
    }
  }
})
