<template>
  <div class="gallery">
    <Loader v-if="loading" />
    <Picture
      v-for="(picture, index) in gallery"
      :key="index"
      :imageUrl="picture" />
    <h1
      class="centered-title"
      v-if="!loading && gallery.length === 0"
    >Kol kas dar nieko nėra...</h1>
  </div>
</template>

<script>
import Picture from '@/components/pictures/Picture'
import PictureService from '@/services/PictureService'
import Loader from '@/components/shared/Loader'

export default {
  data () {
    return {
      gallery: null
    }
  },
  components: {
    Picture,
    Loader
  },
  methods: {
    async fetchPictures () {
      try {
        const { data } = await PictureService.getPictures()
        this.gallery = data.resources.map((resource) => resource.secure_url)
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('setLoading', true)
    this.$ua.trackView('/pictures')
  },
  mounted () {
    this.fetchPictures()
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
}
.centered-title {
  text-align: center;
  color: #fff;
  width: 100%;
}
</style>
