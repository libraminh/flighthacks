<template>
  <div class="row flex-gap-default">
    <div class="col">
      <a
        :href="externalUrl"
        target="_blank"
        class="btn btn--wide btn--primary padding-x-md font-weight-bold justify-content-between text-sm text-uppercase"
      >
        <slot name="apply-now" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="#FFFFFF"
            fill-rule="nonzero"
            d="M15.768 7.427l-5.059-5.19a.777.777 0 0 0-1.118 0 .826.826 0 0 0 0 1.147l3.71 3.805-11.51-.027A.8.8 0 0 0 1 7.973a.8.8 0 0 0 .79.81l11.51.028-3.709 3.805a.826.826 0 0 0 0 1.147.778.778 0 0 0 1.118 0l5.06-5.19a.826.826 0 0 0 0-1.146z"
          />
        </svg>
      </a>
    </div>
    <div class="col">
      <a
        href="javascript:void(0)"
        class="btn btn--wide padding-x-md font-weight-bold justify-content-between text-sm"
      >
        <template v-if="hasReviewSlot">
          <slot
            name="read-review"
          />
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7684 7.42665L11.7091 2.23745C11.4004 1.92085 10.8998 1.92085 10.5911 2.23745C10.2824 2.55413 10.2824 3.06747 10.5911 3.38414L14.3009 7.18918L2.79052 7.1622C2.35396 7.1622 2 7.52525 2 7.97301C2 8.42071 2.35396 8.78382 2.79052 8.78382L14.3009 8.8108L10.5912 12.6158C10.2825 12.9325 10.2825 13.4459 10.5912 13.7625C10.7456 13.9207 10.9479 14 11.1502 14C11.3526 14 11.5549 13.9207 11.7092 13.7625L16.7684 8.57333C17.0772 8.25666 17.0772 7.74332 16.7684 7.42665Z" fill="#ED1F5F"/>
          </svg>
        </template>
      </a>
    </div>
  </div>
</template>

<script>
  import handleAddComparison from "@/mixins/handleAddComparison";

  export default {
    name: "CardCTAs",
    mixins: [handleAddComparison],
    props: {
      externalUrl: {
        type: String,
        default: ""
      }
    },
    computed: {
      hasReviewSlot() {
        return !!this.$slots['read-review']
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>