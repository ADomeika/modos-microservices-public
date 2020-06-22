<template>
  <div>
    <Loader v-if="loading" />
    <div class="form__input" key="imageUpload" v-show="!loading && !uploaded">
      <p>Perdarineju</p>
      <!-- <label>Nuotraukos:</label>
      <NewPictureUpload @fileChange="uploadFiles" />
      <button class="btn" @click="submit">Įkelti nuotraukas</button> -->
    </div>
    <div v-if="!loading && uploaded">
      <h1>Sėkmingai įkelta!</h1>
    </div>
  </div>
</template>

<script>
import PictureService from '@/services/PictureService'
import Loader from '@/components/shared/Loader'

export default {
  data () {
    return {
      imageGallery: null,
      uploaded: false
    }
  },
  components: {
    // NewPictureUpload: () => import('@/components/admin/NewPicture/NewPictureUpload'),
    Loader
  },
  methods: {
    uploadFiles (filesPath) {
      this.imageGallery = filesPath
    },
    async submit () {
      this.$store.dispatch('setLoading', true)
      if (this.imageGallery !== null) {
        try {
          await PictureService.addPictures(this.imageGallery)
          this.uploaded = true
        } catch (error) {
          console.error(error)
        } finally {
          this.$store.dispatch('setLoading', false)
        }
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.getters.loading) {
      alert('Palaukite kol isikels')
      next(false)
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  padding: 20px;
  font-size: 1.2rem;
  margin-top: 20px;
}
.form__input {
  p {
    font-size: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>
