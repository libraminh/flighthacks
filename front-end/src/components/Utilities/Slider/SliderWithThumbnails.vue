<template>
  <div 
    :id="`slider-wrapper-${_uid}`" 
    class="width-100%"
  >
    <div class="margin-bottom-md@sm">
      <slot
        name="slider-main"
        :activeIndex="currentIndex"
        :handle-slide-change="handleSlideChange"
      />
    </div>

    <div class="display@sm">
      <slot
        name="slider-thumbnails"
        :activeIndex="currentIndex"
        :handle-slide-change="handleSlideChange"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: "SliderWithThumbnails",
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      handleSlideChange(index) {
        if (index !== this.currentIndex)
          setTimeout(() => {
            this.$children[0].slider.goTo(index);
            this.$children[1].slider.goTo(index);
            this.currentIndex = index;
          }, 0);
      },
      changeSlide(index) {
        
      }
    },
  }
</script>

<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
}

.btn--slider {
  cursor: pointer;
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: var(--color-primary);
  border: 0;
  outline: none !important;
  transition: all 0.3s;
  transform: translateY(-50%);
  margin-top: 0;
  z-index: 10;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;

  &::after {
    content: '';
    background-color: var(--color-white);
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 50%;
    box-shadow: var(--shadow-lg);
  }

  svg {
    width: 8px;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }

  &.transparent {
    background-color: transparent;
  }

  &.round {
    border-radius: 50%;
    background-color: var(--color-accent);
    box-shadow: 0 14px 35px 0 rgba(0, 0, 0, 0.08);
  }
}
</style>