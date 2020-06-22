<template>
  <div>
    <div class="picture">
      <picture class="about-background">
        <source media="(min-width: 1250px)" srcset="@/assets/about-background.jpg">
        <source media="(min-width: 678px)" srcset="@/assets/resized/threequarters/about-background.jpg">
        <source srcset="@/assets/resized/half/about-background.jpg">
        <img src="" alt="Pagrindine nuotrauka">
      </picture>
      <h1 class="about-us kaushan">{{ $t('components.about.aboutUs') }}</h1>
    </div>
    <Description />
  </div>
</template>

<script>
import Description from '@/components/about/Description'
export default {
  components: {
    Description
  },
  beforeCreate () {
    this.$ua.trackView('/about')
  }
}
</script>

<style lang="scss" scoped>
.picture {
  position: relative;
}
.about-background {
  width: 100%;
  display: block;
  overflow-y: hidden;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.about-us {
  color: #fff;
  display: inline-table;
  font-size: 2em;
  left: 50%;
  position: absolute;
  text-transform: uppercase;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  @media screen and (min-width: 568px) {
    font-size: 3em;
  }
}
</style>
