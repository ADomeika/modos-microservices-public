<template>
  <div class="section-1">
    <div class="information kaushan">
      <div
        class="information__description"
        :class="{ 'selected': info === 1 }"
        @click="info = 1"
      >{{ $t('components.product.sectionOne.description') }}
      </div>
      <div
        class="information__description"
        :class="{ 'selected': info === 2 }"
        @click="info = 2"
      >{{ $t('components.product.sectionOne.additionalInfo') }}
      </div>
    </div>
    <div
      v-if="info === 1"
      class="section-description">
      <p>{{ item.description }}</p>
    </div>
    <div
      v-else
      class="section-description">{{ item.additionalInfo }}</div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      info: 1
    }
  }
}
</script>

<style scoped lang="scss">
.section-1 {
  order: 3;
  width: 100%;
  @media screen and (min-width: 768px) {
    order: 2;
  }
  .information {
    color: #fff;
    display: flex;
    &__description {
      text-align: center;
      border-bottom: 1px solid white;
      width: 50%;
      cursor: pointer;
      &.selected {
        border: 1px solid white;
        border-bottom: none;
      }
    }
    @media screen and (min-width: 1025px) {
      display: flex;
      justify-content: space-around;
    }
  }
  .section-description {
    max-height: 350px;
    overflow: auto;
    color: #fff;
    letter-spacing: 1px;
    font-size: 1.2em;
    padding: 10px;
    @media screen and (min-width: 768px) {
      min-height: 200px;
      height: 100%;
    }
  }
}
</style>
