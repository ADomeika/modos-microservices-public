<template>
  <div class="wrapper">
    <h1>{{ $t('views.success') }}</h1>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('setCartId', null)
    this.$store.dispatch('setCartQuantity', 0)
    this.$store.dispatch('setCartCheck', false)
    this.$store.dispatch('setLoading', false)
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: #fff;
  text-align: center;
}
</style>
