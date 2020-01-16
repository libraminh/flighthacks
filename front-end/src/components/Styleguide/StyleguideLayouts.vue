<template>
  <div>
    <section class="section styleguide">
      <div class="section__inner container padding-y-lg">
        <div class="grid grid-gap-md flex-column margin-top-lg">
          <div class="col-12">
            <div class="text-component max-width-500">
              <h1 class="text-xxxl text-capitalize">
                {{ title }}
              </h1>
              <p class="text-sm">
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Layouts',
  props: {
    title: {
      type: String,
      default: "Layouts"
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
