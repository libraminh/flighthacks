<template>
  <header
    ref="mainHeader"
    :class="{fixed: isFixed, scrolled: isScrolled}"
    class="main-header js-main-header to-animate-wrapper"
    data-theme="default"
  >
    <div class="main-header__wrapper">
      <div class="main-header__layout container">
        <div class="main-header__logo">
          <a
            href="/"
            class="internal-link"
          >
            <img
              :src="navLogo"
              alt="logo"
            >
          </a>
        </div>

        <button
          ref="trigger"
          class="main-header__nav-trigger js-main-header__nav-trigger"
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="main-header-nav"
          @click="toggleMenu"
        >
          <i
            class="main-header__nav-trigger-icon"
            aria-hidden="true"
          />
        </button>

        <nav
          ref="nav"
          class="main-header__nav js-main-header__nav"
          id="main-header-nav"
          aria-labelledby="main-header-nav-label"
          role="navigation"
          data-theme="default"
        >
          <div
            ref="navbarNav"
            class="main-header__nav-list"
          >
            <div
              v-for="(item, index) in navItems"
              :key="index"
              class="main-header__nav-item"
            >
              <a
                :href="item.url"
                :class="['main-header__nav-link', {'is-active': index === activeIndex, 'internal-link': item.type !== 'external'}]"
                :target="item.type === 'external' ? '_blank' : '_self'"
              >{{ item.title }}</a>
            </div>
          </div>

          <div class="main-header__ctas">
            <slot name="header-ctas" />
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import isMobile from "@/mixins/isMobile";

export default {
  name: "Header",
  mixins: [isMobile],
  props: {
    type: {
      type: String,
      default: "default",
      validator: (value) => ['default', 'secondary'].indexOf(value) !== -1
    },
    navLogo: {
      type: String,
      default: "",
      require: true
    },
    navItems: {
      type: Array,
      default: () => [],
      require: true
    },
    navLanguage: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isScrolled: false,
      isFixed: false,
      closed: true,
      activeIndex: 0,
      lastScrollTop: 0,
    };
  },
  mounted() {
    let activeItem = this.navItems.find(item => item.active === true);
    this.activeIndex = this.navItems.indexOf(activeItem);

    this.toggleScrolled();
    // add scrolled class when scroll down
    window.addEventListener('scroll', this.toggleScrolled);

    // hide nav menu on mobile
    if (window.innerWidth < this.breakpoint) this.isMobile = true;

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < this.breakpoint;
    }, false);
  },
  methods: {
    toggleScrolled() {
      if (this.closed) {
        window.scrollY >= 76 ? this.isFixed = true : this.isFixed = false;
        window.scrollY >= 152 ? this.isScrolled = true : this.isScrolled = false;
      }
    },
    toggleMenu() {
      if (window.innerWidth < this.breakpoint) {
        let ariaExpanded = !this.$refs.nav.classList.contains('main-header__nav--is-visible');
        this.isFixed = true;
        this.isScrolled = true;
        this.closed = !this.closed;
        this.subNavOpened = false;
        this.$refs.nav.classList.toggle('main-header__nav--is-visible', ariaExpanded);
        this.$refs.trigger.setAttribute('aria-expanded', ariaExpanded);
        document.body.classList.toggle('nav-open', ariaExpanded);
      }
    },
    navSelectHandler(link, type) {
      this.toggleMenu();

      let url = new URL(link);
      if (url.hash !== '' && url.pathname.split('/')[1] === window.location.pathname.split('/')[1]) {
        this.$scrollTo(url.hash);
      } else {
        if (type === 'external') 
          window.open(link);
        else
          window.location.replace(`${link}`);
      }
    },
    anchorHandler(anchor) {
      if (document.getElementById(anchor.split('#')[1]))
        this.$scrollTo(anchor);
      else
        window.location.replace(`${window.location.origin}${anchor}`);
    }
  }
};
</script>

<style lang="scss">
</style>