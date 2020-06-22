<template>
  <div class="conditions">
    <h1 class="conditions__title">{{ $t('views.conditions.buyingConditions.buyingConditions') }}</h1>
    <ol class="list">
      <li class="list__item">{{ $t('views.conditions.buyingConditions.first') }}</li>
      <li class="list__item">{{ $t('views.conditions.buyingConditions.second') }}</li>
      <li class="list__item">{{ $t('views.conditions.buyingConditions.third') }}</li>
      <li class="list__item">{{ $t('views.conditions.buyingConditions.fourth') }}</li>
      <li class="list__item">{{ $t('views.conditions.buyingConditions.fifth') }}</li>
      <li class="list__item">{{ $t('views.conditions.buyingConditions.sixth') }}</li>
      <li class="list__item">{{ $t('views.conditions.buyingConditions.seventh') }}</li>
      <li class="list__item">{{ $t('views.conditions.buyingConditions.eighth') }}</li>
    </ol>
    <h1 class="conditions__title">{{ $t('views.conditions.returnConditions.returnConditions') }}</h1>
    <p class="conditions__content">{{ $t('views.conditions.returnConditions.prelog') }}</p>
    <p class="conditions__content">{{ $t('views.conditions.returnConditions.prelogTwo') }}</p>
    <ol class="list">
      <li class="list__item">{{ $t('views.conditions.returnConditions.first') }}</li>
      <li class="list__item">{{ $t('views.conditions.returnConditions.second') }}</li>
      <li class="list__item">{{ $t('views.conditions.returnConditions.third') }}</li>
      <li class="list__item">{{ $t('views.conditions.returnConditions.fourth') }}</li>
      <li class="list__item">{{ $t('views.conditions.returnConditions.fifth') }}</li>
      <li class="list__item">{{ $t('views.conditions.returnConditions.sixth') }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.$ua.trackView('/conditions')
  }
}
</script>

<style scoped lang="scss">
.conditions {
  width: 100%;
  color: #fff;
  font-size: 1.2em;
  @media (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
  &__title {
    text-align: center;
    padding: 15px 0 20px;
  }
  &__content {
    padding: 3px 10px;
  }
}
.list {
  padding: 10px 30px;
  &__item {
    padding: 3px;
    line-height: 1.5;
    margin: 30px 0;
  }
}
</style>
