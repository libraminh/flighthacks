<template>
  <transition name="fade">
    <div
      class="cs-tab-pane"
      v-if="(!lazy || loaded) || active"
      v-show="active"
      role="tabpanel"
      :class="{ 'is-active': active }"
      :aria-hidden="!active"
      :id="`pane-${paneName}`"
      :aria-labelledby="`tab-${paneName}`"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
  export default {
    name: "TabPane",
    componentName: "CsTabPane",
    props: {
      label: {
        type: String,
        default: ''
      },
      labelContent: {
        type: Function,
        default: () => {}
      },
      name: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      lazy: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        index: null,
        loaded: false
      };
    },

    computed: {
      active() {
        const active = this.$parent.currentName === (this.name || this.index);

        return active;
      },
      paneName() {
        return this.name || this.index;
      }
    },

    watch: {
      active(val) {
        if (val) this.loaded = true;
      }
    },

    updated() {
      this.$parent.$emit('tab-nav-update');
    }
  }
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>