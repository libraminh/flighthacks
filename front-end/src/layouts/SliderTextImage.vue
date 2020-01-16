<template>
  <slider-default 
    :items="items"
    :gutter="0"
    mode="gallery"
    has-nav
    class="height-100%"
    @slide-change="handleSlideChange"
  >
    <template #default="props">
      <div class="padding-top-xxxl padding-bottom-xxl height-100%">
        <div class="row flex-gap-lg align-items-center justify-content-between height-100%">
          <div :class="['col-6@md height-100% position-relative overflow-auto', {'order-2': textPosition === 'right'}]">
            <div class="d-flex align-items-center height-100%">
              <div class="text-component">
                <p
                  class="text-md text-center font-weight-bold text-color-default"
                  v-html="props.data.title"
                />
                <p v-html="props.data.text" />
              </div>
            </div>
          </div>
          <div class="col-5@md height-100% text-right@md text-center">
            <img
              :src="props.data.image"
              alt="our story"
              class="height-100% object-fit-cover"
            >
          </div>
        </div>
      </div>
    </template>

    <template #special-item>
      <slot
        name="special-item"
        :text-position="textPosition"
      />
    </template>
  </slider-default>
</template>

<script>
  export default {
    name: "SliderTextImage",
    props: {
      items: {
        type: Array,
        default: () => []
      },
      textPosition: {
        type: String,
        default: 'left',
        validation: (val) => ['left', 'right'].indexOf(val) !== -1
      }
    },
    data() {
      return {
        activeIndex: 0
      }
    },
    methods: {
      handleSlideChange(realIndex, index) {
        this.activeIndex = realIndex;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>