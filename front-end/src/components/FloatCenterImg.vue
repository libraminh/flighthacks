<template>
  <div js-mt-half>
    <div class="grid grid-gap-md margin-bottom-lg">
      <div class="col-12 to-animate" data-animate="up">
        <slot name="image" />
      </div>
    </div>

    <div class="grid grid-gap-md to-animate" data-animate="up" data-delay="0.2">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FloatCenterImg',
    mounted() {
      this.setMargin();
      
      window.addEventListener('resize', this.$utils.debounce(() => {
        this.setMargin();
      }))
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.$utils.debounce(() => {
        this.setMargin();
      }))
    },
    methods: {
      setMargin() {
        const elementNegative = document.querySelector('[js-negative-mt-half]');
        const elementParent = document.querySelector('[js-mt-half]');
        const elHeightHalf = elementNegative.clientHeight / 2;

        if (elementNegative.length == 0) return;
    
        elementNegative.style.marginTop = `${-1 * elHeightHalf}px`;
        elementParent.style.marginTop = `${elHeightHalf}px`;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>