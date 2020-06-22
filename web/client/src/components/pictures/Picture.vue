<template>
  <div class="gallery-item">
    <v-lazy-image
      class="picture"
      src=""
      alt="Fallback"
      use-picture>
      <source media="(max-width: 465px)" :srcset="'https://aputplqnen.cloudimg.io/width/415/x/' + imageUrl">
      <source media="(max-width: 1024px)" :srcset="'https://aputplqnen.cloudimg.io/width/485/x/' + imageUrl">
      <source media="(min-width: 1025px)" :srcset="'https://aputplqnen.cloudimg.io/width/570/x/' + imageUrl">
    </v-lazy-image>
  </div>
</template>

<script>
export default {
  props: ['imageUrl']
}
</script>

<style lang="scss" scoped>
.gallery-item {
  width: 100%;
  @media screen and (min-width: 466px) {
    width: 50%;
  }
  @media screen and (min-width: 1025px) {
    width: 33%;
  }
  @media screen and (min-width: 1325px) {
    width: 25%;
  }
}
.picture {
  padding: 5px;
  display: block;
  width: 100%;
}
/deep/ .v-lazy-image-loaded {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
</style>
