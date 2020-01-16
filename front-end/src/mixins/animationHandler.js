// GSAP
import { TweenMax, Expo } from "gsap/all";
import "typesplit";

export default {
  data() {
    return {
      toAnimateEl: null,
    }
  },
  mounted () {
    // reveal element in viewport
    let timeout = this.recreated ? 1000 : 2500;
    setTimeout(() => {
      this.getAnimateEl();

      const splitTypeEls = this.$el.querySelectorAll('[data-animate=type]');
      [...splitTypeEls].forEach(el => { SplitType(el, { split: 'lines, words' }); });

      this.toggleAnimate();
      window.addEventListener('scroll', this.toggleAnimate);
      // window.addEventListener('scroll', this.$utils.throttle(this.toggleAnimate));
    }, timeout);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.toggleAnimate);
  },
  methods: {
    getAnimateEl() {
      this.toAnimateEl = this.$el.querySelectorAll('.to-animate');
    },
    isInViewport(el) {
      let offset = this.isMobile ? 100 : 200;
      const scroll = window.scrollY + offset || window.pageYOffset + offset;
      const boundsTop = el.getBoundingClientRect().top + window.scrollY;

      const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight - offset
      };

      const bounds = {
        top: boundsTop + el.clientHeight * 1 / 3,
        bottom: boundsTop + el.clientHeight
      };

      return bounds.bottom > viewport.top && bounds.top < viewport.bottom;
    },
    toggleAnimate() {
      this.toAnimateEl.forEach(el => {
        if (this.isInViewport(el) && !el.classList.contains('animated')) {
          el.classList.remove('to-animate');
          // el.removeAttribute('data-animate');

          let anim = el.dataset.animate;
          let delay = el.dataset.delay;
          // default animate options
          let animateOptions = { opacity: 0, delay };
          switch (anim) {
            case 'up':
              animateOptions.y = 40;
              break;
            case 'down':
              animateOptions.y = -40;
              break;
            case 'left':
              animateOptions.x = -40;
              break;
            case 'right':
              animateOptions.x = 40;
              break;
            case 'zoom-in':
              animateOptions.scale = 0.8;
              break;
            default:
              break;
          }
          if (anim === 'type') {
            // SplitType(el);
            let animTarget = el.querySelectorAll(`.${el.dataset.animTarget || 'line'}`);
            [...animTarget].forEach((e, index) => {
              TweenMax.from(e, 1, {
                opacity: 0,
                y: 50,
                delay: index * .2,
                ease: Expo.EaseInOut
              });
            });
          } else {
            TweenMax.from(el, 1, animateOptions);
          }

          el.classList.add('animated');
        }
      })
    },
  },
}