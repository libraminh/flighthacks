<template>
  <div id="details-nav-trigger">
    <div
      class="bg-default"
      data-theme="gray"
    >
      <div
        class="container bg-default"
        :data-theme="isMobile ? 'default' : 'gray'"
      >
        <nav class="property-details__nav">
          <ul class="d-flex justify-content-between align-items-center">
            <li
              v-for="(item, index) in items" 
              :key="index"
            >
              <a
                href=""
                v-scroll-to="{el: item.anchor, offset: -100}"
                class="d-inline-block font-weight-bold text-color-gray padding-y-md"
                :class="{'is-active': active === index}"
              >{{ item.title }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import isMobile from "@/mixins/isMobile";

  // import { TimelineMax, TweenMax, Linear } from "gsap";
  import ScrollMagic from "scrollmagic";
  import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

  export default {
    name: "PropertyDetailsNav",
    mixins: [isMobile],
    props: {
      items: {
        type: Array,
        default: () => [],
        required: true
      },
    },
    data() {
      return {
        breakpoint: 576,
        active: 0
      }
    },
    mounted () {
      const details_sections = document.getElementsByClassName('section--propertyDetails');

      // set scrollspy
      window.addEventListener('scroll', this.$utils.debounce(() => {
        const scroll = window.scrollY;
        // const range = this.$refs.list.offsetHeight - this.$refs.picker.offsetHeight;
        // console.log(scroll);
        // if (scroll >= 12 && scroll <= range) {
        //   this.offset = scroll - 12;
        // }
        [...details_sections].slice(1).forEach((el, index) => {
          if (this.$root.isInViewport(el)) {
            this.active = index;
          }
        })
        // console.log(this.$refs.list.offsetHeight)
      }));

      // sticky nav menu
      setTimeout(() => {
        let totalHeight = 0;
        [...details_sections].slice(1).forEach(e => {
          totalHeight += e.clientHeight;
        })
        const details_wrapper = document.getElementById('details-nav-trigger');
        if (details_wrapper) {
          // let details_picker = document.getElementById('details-nav-picker');
          let duration = totalHeight;

          let details_controller = new ScrollMagic.Controller();
          let offset = window.innerWidth < 576 ? -60 : this.$root.isMobile ? -76 : -96;
          new ScrollMagic.Scene({ triggerHook: 'onLeave', triggerElement: '#details-nav-trigger', offset: offset, duration: duration })
          .setPin('#details-nav-trigger')
          .addTo(details_controller);
        }
      }, 1300);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.$utils.debounce(() => {
        if (window.innerWidth >= 992) {
          const scroll = window.scrollY;
          // const range = this.$refs.list.offsetHeight - this.$refs.picker.offsetHeight;
          // console.log(scroll);
          // if (scroll >= 12 && scroll <= range) {
          //   this.offset = scroll - 12;
          // }
          [...details_sections].slice(2).forEach((el, index) => {
            if (this.$root.isInViewport(el)) {
              this.active = index;
            }
          })
        }
        // console.log(this.$refs.list.offsetHeight)
      }));
    },
  }
</script>

<style lang="scss" scoped>

</style>