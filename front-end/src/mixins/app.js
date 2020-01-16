import { TweenMax, Expo } from "gsap/all";
import { RotateLoader } from "vue-spinner/dist/vue-spinner.min";

// import galleryHandler from "./galleryHandler";
import isMobile from "./isMobile";
import animationHandler from "./animationHandler";

import initLibraries from "@/libs/initLibraries";

import { CsHeader } from '@/components/Layout';
import CsNavbar from '@/components/CsNavbar';
import { PropertiesDisplay, PropertyDetailsNav, PropertyInvest } from "@/layouts/Properties";

export default {
  mixins: [isMobile, animationHandler],
  components: {
    "cs-loader": RotateLoader,
    CsHeader,
    CsNavbar,
    PropertiesDisplay,
    PropertyDetailsNav,
    PropertyInvest
  },
  data: {
    // fxElements: null,
    // toSvgEl: null
  },
  created() {
    document.getElementsByTagName("html")[0].className += " js";
  },
  mounted() {
    this.centerInstagram();

    if (this.recreated) {
      let loading_overlay = document.getElementById("page--loading-overlay");
      TweenMax.fromTo(loading_overlay, 1, {
        height: '100%',
      }, {
        height: '0%',
        delay: .5,
        ease: Expo.easeInOut
      })
    }

    // this.toSvgEl = this.$el.querySelectorAll(".to-svg");
    // this.fxElements = this.$el.getElementsByClassName("reveal-fx");

    // Initialize Libraries
    

    if (window.location.hash !== "") this.$scrollTo(window.location.hash);

    setTimeout(() => {
      initLibraries();
      if (this.$utils.hasClass(document.body, "loading")) {
        this.$utils.removeClass(document.body, "loading");
      }
    }, 1300);

    // prevent pressing enter at Coming Soon 
    const inputComingsoon = document.getElementById("contact-email");
    if (inputComingsoon){
      inputComingsoon.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      });
    }
  },
  methods: {
    centerInstagram() {
      const isInstagram = this.$utils.isElementExist('.section--instagram');
      if (!isInstagram) return;

      const sectionInstagram = document.querySelector('.section--instagram');
      const instagramWrapper = document.querySelector('.instagram-wrapper');
      const currentHeight = instagramWrapper.clientHeight;

      instagramWrapper.style.marginTop = `${-1 * (currentHeight * 496 / 1267 + 96)}px`;
      sectionInstagram.style.margin = `${currentHeight / 2}px 0 0`;
    }
  }
}