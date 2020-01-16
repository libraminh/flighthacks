import { tns } from 'tiny-slider/src/tiny-slider';

export default {
  props: {
    customClass: {
      type: String,
      default: ''
    },
    axis: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].indexOf(value) !== -1
    },
    itemsCount: {
      type: Number,
      default: 0,
      required: true,
    },
    mouseDrag: {
      type: Boolean,
      default: false
    },
    perSlide: {
      type: Number,
      default: 1
    },
    gutter: {
      type: Number,
      default: 30
    },
    mode: {
      type: String,
      default: 'carousel',
      validator: (value) => ['carousel', 'gallery'].indexOf(value) !== -1
    },
    fixedWidth: {
      type: Number,
      default: undefined
    },
    center: {
      type: Boolean,
      default: false
    },
    startIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayTimeout: {
      type: Number,
      default: 3500
    },
    responsive: {
      type: Object,
      default: () => {}
    },
    controlsType: {
      type: String,
      default: 'transparent',
      validator: (value) => ['transparent', 'square', 'round'].indexOf(value) !== -1
    },
    hasControls: {
      type: Boolean,
      default: false
    },
    hasNav: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: false
    },
    hasProgress: {
      type: Boolean,
      default: false
    },
    overflowVisible: {
      type: Boolean,
      default: false
    },
    progressClass: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      sliderId: `slider-${this._uid}`,
      activeIndex: '01',
      realIndex: 0,
      slider: undefined
    }
  },
  computed: {
    options() {
      return {
        container: `#${this.sliderId} .tns-slider`,
        axis: this.axis,
        items: this.perSlide,
        startIndex: this.startIndex,
        gutter: this.gutter,
        fixedWidth: this.fixedWidth || false,
        autoWidth: this.autoWidth,
        mode: this.mode,
        center: this.center,
        mouseDrag: this.mouseDrag,
        loop: this.loop,
        rewind: !this.loop,
        autoplay: this.autoplay,
        autoplayTimeout: this.autoplayTimeout,
        autoplayHoverPause: true,
        autoplayButtonOutput: false,
        controls: this.hasControls,
        controlsText: ['', ''],
        controlsContainer: `#${this.sliderId} > .tns-controls`,
        nav: this.hasNav,
        // navContainer: `#${this.sliderId} > .tns-nav`,
        navContainer: false,
        responsive: this.responsive
      }
    },
    totalCount() {
      return this.itemsCount < 10 ? `0${this.itemsCount}` : this.itemsCount;
    },
    responsiveClass() {
      let breakpoint = {
        1200: 'xl',
        992: 'lg',
        768: 'md',
        576: 'sm'
      }

      let controllersResponsiveClass = {nav: '', controls: ''};

      for (let key in this.responsive) {
        let bp = breakpoint[key];
        // let cls = `hide@${bp}`;

        for (let key1 in this.responsive[key]) {
          if (key1 === 'nav' || key1 === 'controls')
            controllersResponsiveClass[key1] = this.responsive[key][key1] ? `display@${bp}` : `hide@${bp}`;
        }
      }

      return controllersResponsiveClass;
    }
  },
  mounted() {
    this.slider = tns(this.options);

    let maxHeight = 0;
    // if (this.axis === 'vertical') {
    //   for(let i = 0; i < this.itemsCount; i++) {
    //     let sum = 0;
    //     for (let j = i; j < i + 4; j++) {
    //       let index = j >= this.itemsCount ? j - this.itemsCount : j;
    //       sum += this.$refs.sliderItems[index].clientHeight + 30;
    //     }

    //     if (sum > maxHeight) maxHeight = sum;
    //   }
    //   setTimeout(() => {
    //     this.$refs.slider.parentElement.parentElement.style.height = `${maxHeight}px`;
    //   }, 1300);
    // }

    this.slider.events.on('indexChanged', this.getIndex);
    // this.getIndex(maxHeight);

  },
  methods: {
    getIndex(maxHeight) {
      // console.log(this.slider.getInfo());
      const info = this.slider.getInfo();
      let index = info.displayIndex - 1 + info.items;
      this.realIndex = info.displayIndex - 1;
      // param 1: real index in data array
      // param 2: index in loop mode (included cloned elms)
      this.$emit('slide-change', this.realIndex, info.index);
      index < 10 ? this.activeIndex = `0${index}` : this.activeIndex = index;

      // if (maxHeight)
      //   setTimeout(() => {
      //     this.$refs.slider.parentElement.parentElement.parentElement.style.height = `${maxHeight}px`;
      //   }, 1000);
    },
  },
}