<template>
  <div class="description">
    <div class="description__heading">
      <div class="description__heading--top">
        <p>MoDo's Design</p>
      </div>
      <div class="description__heading--bottom">
        <p>{{ $t('components.about.descriptionHeading') }}</p>
      </div>
    </div>
    <div class="description__subheading">
      <p>{{ $t('components.about.descriptionSubheading') }}</p>
    </div>
    <div class="description__body">
      <p>
        {{ $t('components.about.descriptionBody') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  color: #fff;
  display: flex;
  font-size: 1.4em;
  flex-direction: column;
  &__heading {
    display: flex;
    font-weight: 600;
    flex-direction: column;
    margin-left: 0.5em;
    padding-top: 1.5em;
    &--top {
      font-size: 1.8em;
      text-align: center;
    }
    &--bottom {
      font-style: italic;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }
  &__subheading {
    font-size: 1.1em;
    font-weight: 600;
    margin: 1.2em 0;
    text-align: center;
  }
  &__body {
    margin: 20px;
    @media (min-width: 768px) {
      width: 80%;
      margin: 20px auto;
    }
  }
}
</style>
