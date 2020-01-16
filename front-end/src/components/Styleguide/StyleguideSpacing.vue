<template>
  <section class="section styleguide">
    <div class="section__inner container padding-y-lg">
      <div class="grid grid-gap-md flex-column margin-top-lg">
        <div class="col-12">
          <div class="text-component max-width-500">
            <h1 class="text-xxxl text-capitalize">
              Spacing
            </h1>
            <p class="text-sm">
              {{ description }}
            </p>
          </div>
        </div>
        <div class="col-12">
          <div class="grid grid-gap-sm items-center">
            <div 
              v-for="(size, index) in sizesIndex"
              :key="size"
              class="col"
            >
              <div
                class="bg-primary position-relative"
                :style="{ height: `var(--space-${size})` }"
              >
                <span
                  class="margin-top-xxs width-100% text-xs text-center display@sm"
                  style="position: absolute; bottom: 100%; "
                > {{ size }}</span>

                <span
                  class="margin-top-xxs width-100% text-xs text-center display@sm"
                  style="position: absolute; top: 100%; "
                > {{ sizeValues[index] }}px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'Spacing',
    props: {
      description: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        sizesIndex: [
          'xxxxs',
          'xxxs',
          'xxs',
          'xs',
          'sm',
          'unit',
          'md',
          'lg',
          'xl',
          'xxl',
          'xxxl',
          'xxxxl'
        ]
      }
    },
    computed: {
      sizeValues() {
        let arr = [];

        this.sizesIndex.forEach(size => {
          arr.push(this.getSpaceValue(size));
        });

        return arr;
      }
    },
    mounted () {},
    methods: {
      getSpaceValue(unit) {
        if(!unit) return 
        const style = window.getComputedStyle(document.documentElement);
        // After the numbers are extracted from string, they can be converted to Number format.
        const spaceValues = style.getPropertyValue(`--space-${unit}`).match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
        const scaleRatio = spaceValues[0];
        const spaceUnit = spaceValues[1] || 1;
        return (scaleRatio * spaceUnit);
      }
    },
}
</script>

<style lang="scss" scoped>

</style>
