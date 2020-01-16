<template>
  <section class="section styleguide">
    <div class="section__inner padding-y-lg">
      <div class="text-component max-width-500">
        <h1 class="text-xxxl text-capitalize">
          Typography
        </h1>
        <p class="text-sm">
          {{ description }}
        </p>
      </div>
      <div class="grid grid-gap-md margin-top-lg">
        <div class="col-9 col-4@sm col-6@md flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Example</span>
        </div>
        <div class="col-3 col-2@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Type</span>
        </div>
        <div class="col-2@sm display@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Font</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Font-Size</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Line Height</span>
        </div>
      </div>
      <div
        class="grid grid-gap-md"
        v-for="(typeface, index) in typefaces"
        :key="index"
      >
        <div class="col-9 col-4@sm col-6@md flex items-center border-bottom padding-y-md">
          <div class="text-component">
            <component :is="typeface.tag">
              The quick brown fox jumps over the lazy dog
            </component>
          </div>
        </div>
        <div class="col-3 col-2@sm flex items-center border-bottom padding-y-md">
          <div class="text-sm">
            {{ typeface.type }}
          </div>
        </div>
        <div class="col-2@sm display@sm flex items-center border-bottom padding-y-md">
          <span class="text-sm">{{ typeface.font }}</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center border-bottom padding-y-md">
          <span class="text-sm">{{ typeface.fontSize }}</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center border-bottom padding-y-md">
          <span class="text-sm">{{ typeface.lineHeight }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: "Typography",
    props: {
        description: {
            type: String,
            default: ""
        },
        typefaces: {
            type: Array,
            default: () => [
                { tag: "h1", type: "Heading 1", font: "Libre Baskerville", fontSize: "3.421em", lineHeight: "1.125" },
                { tag: "h2", type: "Heading 2", font: "Libre Baskerville", fontSize: "3.421em", lineHeight: "1.125" },
                { tag: "h3", type: "Heading 3", font: "Libre Baskerville", fontSize: "3.421em", lineHeight: "1.125" },
                { tag: "h4", type: "Heading 4", font: "Libre Baskerville", fontSize: "3.421em", lineHeight: "1.125" },
                { tag: "h5", type: "Heading 5", font: "Libre Baskerville", fontSize: "3.421em", lineHeight: "1.125" },
                { tag: "h6", type: "Heading 6", font: "Libre Baskerville", fontSize: "3.421em", lineHeight: "1.125" },
            ]
        },
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
</style>
