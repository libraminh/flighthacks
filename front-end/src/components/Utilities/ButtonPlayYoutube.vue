<template>
  <div>
    <a
      v-if="type === 'text'"
      href=""
      class="btn btn--default"
      :aria-controls="`modalVideo${_uid}`"
      :data-url="videoUrl"
    >{{ title }} <i class="far fa-angle-right ml-auto" /></a>
    <a
      v-else
      href=""
      class="btn--play rounded-circle"
      :style="{width: `${width}px`, height: `${width}px`}"
      :aria-controls="`modalVideo${_uid}`"
      :data-url="videoUrl"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
      >
        <g>
          <path d="M19.8136 11.178C20.3876 11.5757 20.3876 12.4243 19.8136 12.822L7.56949 21.3049C6.90629 21.7644 6 21.2898 6 20.4829L6 3.51707C6 2.71025 6.90629 2.23559 7.5695 2.69507L19.8136 11.178Z" />
        </g>
      </svg>
    </a>
    <div
      ref="modalVideo"
      class="modal modal-video js-modal js-modal-video"
      :id="`modalVideo${_uid}`"
      data-animation="on"
    >
      <div
        class="modal-video__content max-width-md js-modal-video__content"
        role="alertdialog"
        tabindex="-1"
        :aria-describedby="`modalVideoDescription${_uid}`"
      >
        <p
          class="sr-only"
          :id="`modalVideoDescription${_uid}`"
        >
          A video is being shown
        </p>
        
        <div class="media-wrapper">
          <div class="crop crop--fill crop--16:9 width-100%">
            <iframe
              src=""
              class="js-modal-video__media crop__content"
              width="640"
              height="360"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            />
          </div>
        </div>
      </div>
      
      <div
        class="modal-video__loader"
        aria-hidden="true"
      >
        <svg class="icon icon--lg icon--is-spinning"><path
          d="M24,48A24,24,0,1,1,48,24,24.027,24.027,0,0,1,24,48ZM24,4A20,20,0,1,0,44,24,20.023,20.023,0,0,0,24,4Z"
          opacity="0.4"
        /><path d="M48,24H44A20.023,20.023,0,0,0,24,4V0A24.028,24.028,0,0,1,48,24Z" /></svg>
      </div>

      <button class="reset modal__close-btn js-modal__close">
        <svg
          class="icon"
          viewBox="0 0 16 16"
        ><title>Close modal window</title><g
          stroke-width="1"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
        ><line
          x1="13.5"
          y1="2.5"
          x2="2.5"
          y2="13.5"
        /><line
          x1="2.5"
          y1="2.5"
          x2="13.5"
          y2="13.5"
        /></g></svg>
      </button>
    </div>
  </div>
</template>

<script>
  // import Modal from "@/libs/ModalWindow";
  // import ModalVideo from "@/libs/ModalVideo";
  // import "@/libs/ModalWindow/style.scss";
  // import "@/libs/ModalVideo/style.scss";

  export default {
    name: "ButtonPlayYoutube",
    props: {
      type: {
        type: String,
        default: 'icon'
      },
      title: {
        type: String,
        default: ''
      },
      width: {
        type: Number,
        default: 72
      },
      videoUrl: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        modalVideo: false,
        popupPlayer: undefined,
        popupId: `popup-video-${this._uid}`
      }
    },
    mounted() {
      this.initPopupPLayer()
    },
    methods: {
      initPopupPLayer() {
        // let tmp = new YT.Player(this.popupId);
        // console.log(tmp)
      }
    },
  }
</script>

<style lang="scss" scoped>
.btn--play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  color: inherit;
  background-color: inherit;
  transform: translate(-50%, -50%);
  z-index: 1;

  @include breakpoint(md, 'not all') {
    width: 72px !important;
    height: 72px !important;
  }
}
</style>