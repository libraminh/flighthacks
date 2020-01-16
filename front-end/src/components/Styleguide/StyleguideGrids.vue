<template>
  <div>
    <section class="section styleguide">
      <div class="section__inner container padding-y-lg">
        <div class="text-component max-width-500">
          <h1 class="text-xxxl text-capitalize">
            {{ title }}
          </h1>
          <p class="text-sm">
            {{ description }}
          </p>
        </div>

        <div class="grid grid-gap-md margin-top-lg">
          <div class="col-6@sm">
            <div class="bg-accent padding-md">
              Col 6@sm
            </div>
          </div>
          <div class="col-6@sm">
            <div class="bg-accent padding-md">
              Col 6@sm
            </div>
          </div>
        </div>

        <div class="grid grid-gap-md margin-top-lg">
          <div class="col-6@sm col-4@md">
            <div class="bg-accent padding-md">
              Col 6@sm / Col 4@md
            </div>
          </div>
          <div class="col-6@sm col-4@md">
            <div class="bg-accent padding-md">
              Col 6@sm / Col 4@md
            </div>
          </div>
          <div class="col-6@sm col-4@md">
            <div class="bg-accent padding-md">
              Col 6@sm / Col 4@md
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: 'Grids',
    props: {
        title: {
            type: String,
            default: "Grids"
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
