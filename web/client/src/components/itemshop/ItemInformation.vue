<template>
  <div class="item-information">
    <SectionOne :item="item" />
    <div class="kaushan item-name">{{item.name}}</div>
    <SectionTwo :item="item" />
  </div>
</template>

<script>
import SectionOne from './information/SectionOne'
import SectionTwo from './information/SectionTwo'

export default {
  props: ['item'],
  components: {
    SectionOne,
    SectionTwo
  }
}
</script>

<style scoped lang="scss">
.item-information {
  display: flex;
  flex-flow: wrap;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 85%;
    margin: 0 auto;
  }
  @media screen and (min-width: 1025px) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .item-name {
    width: 100%;
    order: 1;
    color: #fff;
    font-size: 1.8em;
    padding-top: 10px;
    padding-left: 10px;
    margin-bottom: 20px;
  }
}
</style>
