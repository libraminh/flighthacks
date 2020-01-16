export default {
  data() {
    return {
      isMobile: false,
      breakpoint: 768
    }
  },
  mounted () {
    this.checkMobile();
    
    window.addEventListener('resize', () => {
      this.checkMobile();
    });
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {
      this.checkMobile();
    });
  },
  methods: {
    checkMobile() {
      if (window.innerWidth < this.breakpoint) this.isMobile = true;
      else this.isMobile = false;
    },
  },
}