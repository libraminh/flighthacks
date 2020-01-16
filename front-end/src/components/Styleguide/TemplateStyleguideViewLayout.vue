<template>
  <div
    class="styleguide styleguide--viewLayout"
    :class="hasNoBorder === true ? 'has-no-border' : ''"
  >
    <!-- Markup -->
    <slot
      v-if="!hasClassMaxWidth"
      name="markup"
    />

    <section
      v-else
      class="section"
    >
      <div
        class="section__inner"
        :class="hasClassMaxWidth"
      >
        <slot name="markup" />
      </div>
    </section>
    <!-- Markup -->

    <!-- styleguide description -->
    <footer
      v-if="$slots.description"
      class="styleguide__footer"
    >
      <div class="text-component">
        <h2 class="styleguide__small">
          <slot name="description" />
        </h2>
      </div>
    </footer>
    <!-- styleguide description -->
  </div>
</template>

<script>
export default {
    name: 'TemplateStyleguideViewLayout',
    components: {
    },
    props: {
        hasClassMaxWidth: {
            type: String,
            default: ''
        },
        hasNoBorder: {
            type: Boolean,
            default: false
        },
    },
}
</script>
