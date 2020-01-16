<template>
  <section class="section styleguide">
    <div class="section__inner container padding-y-lg">
      <div class="text-component max-width-500 margin-bottom-xl">
        <h1 class="text-xxxl text-capitalize">
          {{ title }}
        </h1>
        <p class="text-sm">
          {{ description }}
        </p>
      </div>

      <slot name="component-listing" />
    </div>
  </section>
</template>

<script>
export default {
    name: 'Components',
    props: {
      title: {
        type: String,
        default: "Components"
      },
      description: {
        type: String,
        default: ""
      },
    },
}
</script>

<style lang="scss" scoped>

</style>
