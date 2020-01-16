<script>
  const firstUpperCase = str => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  };

  export default {
    name: "TabNav",
    props: {
      panes: {
        type: Array,
        default: () => []
      },
      currentName: {
        type: String,
        default: ''
      },
      onTabClick: {
        type: Function,
        default: () => {}
      }
    },

    data() {
      return {
        // scrollable: false,
        navOffset: 0,
        isFocus: false,
        focusable: true,
        progress: 100,
        sizeName: 'height'
      };
    },

    computed: {
      navStyle() {
        const dir = 'Y';
        return {
          transform: `translate${dir}(-${this.navOffset}px)`
        };
      },
    },

    updated() {
      this.update();
    },

    render(h) {
      const {
        panes,
        onTabClick,
        navStyle,
        changeTab,
        setFocus,
        removeFocus,
        progress
      } = this;

      const tabs = this._l(panes, (pane, index) => {
        let tabName = pane.name || pane.index || index;

        pane.index = `${index}`;

        const tabLabelContent = pane.$slots.label || pane.label;
        const tabindex = pane.active ? 0 : -1;
        return (
          <div
            class={{
              'cs-tabs__item': true,
              'is-active': pane.active,
              'is-disabled': pane.disabled,
              'is-focus': this.isFocus
            }}
            id={`tab-${tabName}`}
            key={`tab-${tabName}`}
            aria-controls={`pane-${tabName}`}
            role="tab"
            aria-selected={ pane.active }
            ref="tabs"
            tabindex={tabindex}
            refInFor
            on-focus={ ()=> { setFocus(); }}
            on-blur ={ ()=> { removeFocus(); }}
            on-click={(ev) => { removeFocus(); onTabClick(pane, tabName, ev); this.progress = 0; }}
          >
            <el-progress percentage={ pane.active ? progress : 0 } type="circle" color="#13C2C8" width={120} show-text={false}></el-progress>
            {tabLabelContent}
          </div>
        );
      });
      // {!type ? <tab-bar tabs={panes}></tab-bar> : null}
      return (
        <div class="cs-tabs__nav-wrap">
          <div class={['cs-tabs__nav-scroll']} ref="navScroll">
            <div
              class="cs-tabs__nav"
              ref="nav"
              style={navStyle}
              role="tablist"
              on-keydown={ changeTab }
            >
              {tabs}
            </div>
          </div>
        </div>
      );
    },

    mounted() {
      // addResizeListener(this.$el, this.update);
      document.addEventListener('visibilitychange', this.visibilityChangeHandler);
      window.addEventListener('blur', this.windowBlurHandler);
      window.addEventListener('focus', this.windowFocusHandler);
      setTimeout(() => {
        this.scrollToActiveTab();
      }, 0);

      setInterval(() => {
        if (this.progress === 100) {
          this.progress = 0;

          let tabList = this.$refs.tabs;
          let currentIndex = Array.prototype.indexOf.call(this.panes, this.panes.find(item => item.active));
          let nextIndex;

          if (currentIndex < tabList.length - 1) { // not last
            nextIndex = currentIndex + 1;
          } else {
            nextIndex = 0;
          }

          // tabList[nextIndex].focus();
          tabList[nextIndex].click();
          // this.setFocus();
        }
        this.progress += 12.5;
      }, 599);
    },

    beforeDestroy() {
      // if (this.$el && this.update) removeResizeListener(this.$el, this.update);
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
      window.removeEventListener('blur', this.windowBlurHandler);
      window.removeEventListener('focus', this.windowFocusHandler);
    },

    methods: {
      scrollNext() {
        const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`];
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
        const currentOffset = this.navOffset;

        if (navSize - currentOffset <= containerSize) return;

        let newOffset = navSize - currentOffset > containerSize * 2
          ? currentOffset + containerSize
          : (navSize - containerSize);

        this.navOffset = newOffset;
      },
      scrollToActiveTab() {
        if (!this.scrollable) return;
        const nav = this.$refs.nav;
        const activeTab = this.$el.querySelector('.is-active');
        if (!activeTab) return;
        const navScroll = this.$refs.navScroll;
        // const isHorizontal = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1;
        const activeTabBounding = activeTab.getBoundingClientRect();
        const navScrollBounding = navScroll.getBoundingClientRect();
        const maxOffset = nav.offsetHeight - navScrollBounding.height;
        const currentOffset = this.navOffset;
        let newOffset = currentOffset;

        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
        }
        newOffset = Math.max(newOffset, 0);
        this.navOffset = Math.min(newOffset, maxOffset);
      },
      update() {
        if (!this.$refs.nav) return;
        const sizeName = 'height';
        const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`];
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`];
        const currentOffset = this.navOffset;

        if (containerSize < navSize) {
          const currentOffset = this.navOffset;
          this.scrollable = this.scrollable || {};
          this.scrollable.prev = currentOffset;
          this.scrollable.next = currentOffset + containerSize < navSize;
          if (navSize - currentOffset < containerSize) {
            this.navOffset = navSize - containerSize;
          }
        } else {
          this.scrollable = false;
          if (currentOffset > 0) {
            this.navOffset = 0;
          }
        }

        // this.progress = 0;
      },
      changeTab(e) {
        const keyCode = e.keyCode;
        let nextIndex;
        let currentIndex, tabList;
        if ([37, 38, 39, 40].indexOf(keyCode) !== -1) { // 左右上下键更换tab
          tabList = e.currentTarget.querySelectorAll('[role=tab]');
          currentIndex = Array.prototype.indexOf.call(tabList, e.target);
        } else {
          return;
        }
        if (keyCode === 37 || keyCode === 38) { // left
          if (currentIndex === 0) { // first
            nextIndex = tabList.length - 1;
          } else {
            nextIndex = currentIndex - 1;
          }
        } else { // right
          if (currentIndex < tabList.length - 1) { // not last
            nextIndex = currentIndex + 1;
          } else {
            nextIndex = 0;
          }
        }
        tabList[nextIndex].focus(); // 改变焦点元素
        tabList[nextIndex].click(); // 选中下一个tab
        this.setFocus();
      },
      setFocus() {
        if (this.focusable) {
          this.isFocus = true;
        }
      },
      removeFocus() {
        this.isFocus = false;
      },
      visibilityChangeHandler() {
        const visibility = document.visibilityState;
        if (visibility === 'hidden') {
          this.focusable = false;
        } else if (visibility === 'visible') {
          setTimeout(() => {
            this.focusable = true;
          }, 50);
        }
      },
      windowBlurHandler() {
        this.focusable = false;
      },
      windowFocusHandler() {
        setTimeout(() => {
          this.focusable = true;
        }, 50);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>