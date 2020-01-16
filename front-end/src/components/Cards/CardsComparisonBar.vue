<template>
  <div 
    id="cards-comparison-bar" 
    :class="['border-top border-default', {'shown': isVisible}]"
    data-theme="default"
  >
    <div class="padding-x-container@md padding-right-container width-100%">
      <div class="d-flex flex-gap-md justify-content-between flex-nowrap">
        <div class="d-inline-flex flex-gap-md align-items-center">
          <div class="blockquote__footer">
            <p class="blockquote__name display@md">
              <slot name="comparison" />
            </p>
          </div>
          <div class="d-flex flex-gap-sm">
            <div 
              v-for="index in amountCompare"
              :key="index"
            >
              <div :class="['comparing-card__item', {'has-item': currentCards[index - 1] !== undefined}]">
                <div class="crop crop--fit padding-bottom-0 height-100%">
                  <img
                    v-if="currentCards[index - 1]"
                    :src="currentCards[index - 1].image"
                    :alt="currentCards[index - 1].name"
                    class="crop__content"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-inline-flex flex-gap-md align-items-center">
          <div>
            <a
              :href="currentCards.length <= 1 ? 'javascript:void(0)' : `${compareUrl}?id=${currentCards.map(item => item.id).join()}`"
              :class="['btn btn--primary btn--md btn--adaptive', {'btn--disabled': currentCards.length <= 1}]"
            >
              <slot name="compare" />
            </a>
          </div>
          <div>
            <a
              href="#"
              :class="['btn btn--icon btn--adaptive', {'btn--disabled': currentCards.length === 0}]"
              @click.prevent="handleRemoveComparison"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#FF3465"
                  fill-rule="nonzero"
                  d="M13 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.766a1 1 0 0 1-.758-.347l-3.446-4a1 1 0 0 1 0-1.306l3.446-4A1 1 0 0 1 4.766 3H13zM9.969 5a.423.423 0 0 0-.308.134L8 6.794l-1.66-1.66a.423.423 0 0 0-.617 0l-.59.59a.423.423 0 0 0 0 .615L6.796 8 5.134 9.66a.423.423 0 0 0 0 .617l.59.59a.423.423 0 0 0 .615 0L8 9.204l1.66 1.661a.423.423 0 0 0 .617 0l.59-.59a.423.423 0 0 0 0-.615L9.204 8l1.661-1.66a.423.423 0 0 0 0-.617l-.59-.59A.423.423 0 0 0 9.97 5z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import watchComparingCards from "@/mixins/watchComparingCards";
  import isMobile from "@/mixins/isMobile";

  export default {
    name: "CardsComparisonBar",
    mixins: [watchComparingCards, isMobile],
    props: {
      compareUrl: {
        type: String,
        default: ""
      },
    },
    computed: {
      isVisible() {
        return this.currentCards.length > 0;
      },
      amountCompare() {
        return this.isMobile ? 2 : 3;
      }
    },
    watch: {
      isVisible(value) {
        this.$emit('visible-change', value);
      }
    },
    methods: {
      handleRemoveComparison() {
        this.currentCards = [];
        localStorage.setItem('comparing-cards', '[]')
      },
      handleCompare() {
        
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>