<template>
  <div 
    :id="sliderId" 
    :class="['slider-wrapper width-100%', {'slider-overflow-visible': overflowVisible}]"
  >
    <div
      ref="slider"
      class="tns-slider"
    >
      <div 
        v-for="index in totalPages"
        :key="index"
        class="slider-item"
      >
        <slot 
          :index="index-1"
          :data="items[index-1]" 
        />
      </div>
    </div>
    <div 
      v-if="hasControls" 
      class="tns-controls"
    >
      <button :class="`btn btn--icon prev ${controlsType}`">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M6.688 8.003l5.095-5.238A.77.77 0 0 0 12 2.224a.77.77 0 0 0-.217-.542l-.447-.458a.729.729 0 0 0-1.053 0L4.217 7.46A.77.77 0 0 0 4 8.003c0 .206.076.399.217.543l6.06 6.23a.729.729 0 0 0 1.054 0l.446-.458a.782.782 0 0 0 0-1.083L6.688 8.003z"
          />
        </svg>
      </button>

      <button :class="`btn btn--icon next ${controlsType}`">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M10.312 8.003L5.217 2.765A.77.77 0 0 1 5 2.224a.77.77 0 0 1 .217-.542l.447-.458a.729.729 0 0 1 1.053 0l6.066 6.236a.77.77 0 0 1 .217.543.77.77 0 0 1-.217.543l-6.06 6.23a.729.729 0 0 1-1.054 0l-.446-.458a.782.782 0 0 1 0-1.083l5.089-5.232z"
          />
        </svg>
      </button>
    </div>
    <ul 
      v-if="hasNav" 
      class="tns-nav"
    >
      <li 
        v-for="(index) in items.length" 
        :key="`nav-${index-1}`"
        :class="{'tns-nav-active': index - 1 === realIndex}"
        @click="slider.goTo(index-1)"
      />
    </ul>
    <div
      v-if="hasPagination"
      class="tns-pagination"
    >
      <span class="current">{{ activeIndex }}</span>
      /
      <span class="total">{{ totalCount }}</span>
    </div>
    <div 
      v-if="hasProgress"
      class="tns-progress"
    >
      <span
        class="progress"
        :style="{width: `${parseInt(activeIndex) / totalPages * 100}%`}"
      />
    </div>
  </div>
</template>

<script>
  import SliderComponents from './mixins/SliderComponents'

  export default {
    name: "SliderBundle",
    mixins: [SliderComponents],
    props: {
      itemsPerPage: {
        type: Number,
        default: 1
      },
    },
    computed: {
      totalPages() {
        return Math.floor(this.items.length / this.itemsPerPage) + 1;
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