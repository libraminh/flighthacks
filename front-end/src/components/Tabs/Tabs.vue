<template>
  <div class="cs-tabs cs-tabs--autoplay">
    <div class="cs-tabs__header">
      <tab-nav 
        ref="nav" 
        :current-name="currentName"
        :on-tab-click="handleTabClick"
        :panes="panes"
      />
    </div>

    <div
      class="cs-tabs__content"
      data-theme="gray"
    >
      <div 
        :style="indicatorStyle"
        class="cs-tabs__indicator"
      >
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 16L12 0L24 16H0Z"
            fill="#F2F2F2"
          />
        </svg>
      </div>
      <div class="position-relative">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import TabNav from "./TabNav.vue";

  export default {
    name: "Tabs",
    componentName: 'CsTabs',
    components: {
      TabNav,
    },
    props: {
      value: {
        type: String,
        default: undefined
      },
      activeName: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        currentName: this.value || this.activeName,
        panes: []
      }
    },
    computed: {
      activeIndex() {
        return this.panes.indexOf(this.panes.find(item => item.active))
      },
      indicatorStyle() {
        return `left: calc((100% + var(--space-md)) * ${(2 * this.activeIndex + 1) / (this.panes.length * 2)} - var(--space-sm))`
      }
    },
    watch: {
      activeName(value) {
        this.setCurrentName(value);
      },
      value(value) {
        this.setCurrentName(value);
      },
      currentName(value) {
        if (this.$refs.nav) {
          this.$nextTick(() => {
            this.$refs.nav.$nextTick(_ => {
              this.$refs.nav.scrollToActiveTab();
            });
          });
        }
      },
    },
    created() {
      if (!this.currentName) {
        this.setCurrentName('0');
      }

      this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true));
    },
    mounted() {
      this.calcPaneInstances();
    },
    updated() {
      this.calcPaneInstances();
    },
    methods: {
      calcPaneInstances(isForceUpdate = false) {
        if (this.$slots.default) {
          const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
            vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'TabPane');
          // update indeed
          const panes = paneSlots.map(({ componentInstance }) => componentInstance);
          const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));
          if (isForceUpdate || panesChanged) {
            this.panes = panes;
          }
        } else if (this.panes.length !== 0) {
          this.panes = [];
        }
      },
      handleTabClick(tab, tabName, event) {
        if (tab.disabled) return;
        this.setCurrentName(tabName);
        this.$emit('tab-click', tab, event);
      },
      // handleTabRemove(pane, ev) {
      //   if (pane.disabled) return;
      //   ev.stopPropagation();
      //   this.$emit('edit', pane.name, 'remove');
      //   this.$emit('tab-remove', pane.name);
      // },
      // handleTabAdd() {
      //   this.$emit('edit', null, 'add');
      //   this.$emit('tab-add');
      // },
      setCurrentName(value) {
        const changeCurrentName = () => {
          this.currentName = value;
          this.$emit('input', value);
        };
        if (this.currentName !== value && this.beforeLeave) {
          const before = this.beforeLeave(value, this.currentName);
          if (before && before.then) {
            before
              .then(() => {
                changeCurrentName();
                this.$refs.nav && this.$refs.nav.removeFocus();
              }, () => {
                // https://github.com/ElemeFE/element/pull/14816
                // ignore promise rejection in `before-leave` hook
              });
          } else if (before !== false) {
            changeCurrentName();
          }
        } else {
          changeCurrentName();
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>