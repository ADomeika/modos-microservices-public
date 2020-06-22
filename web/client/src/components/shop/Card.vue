<template>
  <div class="card">
    <div>
      <router-link class="card__image" :to="`/parduotuve/${item.category}/${item._id}`">
        <picture class="picture">
          <source media="(max-width: 414px)" :srcset="'https://aputplqnen.cloudimg.io/crop/370x370/x/' + item.gallery[0]">
          <source media="(max-width: 767px)" :srcset="'https://aputplqnen.cloudimg.io/crop/350x350/x/' + item.gallery[0]">
          <source media="(min-width: 768px)" :srcset="'https://aputplqnen.cloudimg.io/crop/360x360/x/' + item.gallery[0]">
          <img class="image" :src="'https://aputplqnen.cloudimg.io/crop/360x360/x/' + item.gallery[0]" alt="Produkto nuotrauka">
        </picture>
      </router-link>
    </div>
    <div class="sale" v-if="item.onSale">SALE</div>
    <div class="description">
      <router-link class="card__title" :to="`/parduotuve/${item.category}/${item._id}`">
        <h2>{{ item.name }}</h2>
      </router-link>
      <div v-if="item.onSale" class="card__original-price">
        {{ item.originalPrice | currency }}
      </div>
      <div class="card__price">
        {{ item.price | currency }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      quantity: 1
    }
  }
}
</script>

<style scoped lang="scss">
.description {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding-top: 10px;
}
* {
  transition: all .2s linear;
}
.card {
  margin: 10px;
  position: relative;
  background-color: rgba(39, 39, 39, 0.6);
  flex-basis: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: 415px) {
    flex-basis: 44%;
  }
  @media screen and (min-width: 768px) {
    flex-basis: 31%;
    margin: 10px 1%;
    &:nth-child(3n) {
      margin-right: 10px;
    }
  }
  @media screen and (min-width: 1485px) {
    flex-basis: 23%;
    &:nth-child(4n) {
      margin-right: 10px;
    }
  }
  .sale {
    position: absolute;
    top: 23px;
    right: -30px;
    background-color: red;
    padding: 0 35px;
    transform: rotate(45deg);
    z-index: 1;
    font-weight: bold;
    color: #fff;
    font-size: 1.6em;
  }
  &__image {
    display: block;
    overflow: hidden;
    .picture {
      display: block;
      .image {
        width: 100%;
      }
    }
  }
  &__title {
    color: #fff;
    text-align: center;
    padding: 5px 10px;
    word-break: break-all;
  }
  &__original-price {
    text-align: center;
    font-size: 1.2em;
    color: #afafaf;
    margin-bottom: 20px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 55px;
      height: 2px;
      background-color: #afafaf;
      transform: translateX(-50%) translateY(-50%) rotate(-30deg);
    }
  }
  &__price {
    text-align: center;
    font-size: 1.6em;
    color: #fff;
    margin-bottom: 20px;
  }
}

/deep/ .v-lazy-image-loaded {
  width: 100%;
  display: block;
  transition: transform .3s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
