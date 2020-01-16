<template>
  <div class="section__inner container padding-y-xl section--cards-filter">
    <div
      :class="['filter-select__wrapper margin-bottom-xl bg-default', {'is-open': openFilter}]"
      :data-theme="isMobile ? 'default' : 'gray'"
    >
      <div class="d-flex justify-content-between">
        <p class="font-weight-semi text-color-default display@md">
          <slot name="filter-title" />
        </p>
        <h3 class="hide@md">
          <slot name="filter-title" />
        </h3>
        <a
          href=""
          class="hide@md d-flex align-items-center"
          @click.prevent="openFilter = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="#FF3465"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M5 5l14 14M19 5L5 19" />
            </g>
          </svg>
        </a>

        <div class="d-flex align-items-center display@md border border-contrast-low rounded-sm padding-xxxs text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#787878"
              fill-rule="evenodd"
              d="M16 11.04v.109c0 1.02-.772 1.851-1.752 1.851H1.817C.837 13 0 12.168 0 11.149v-.109h16zM14.248 3C15.228 3 16 3.821 16 4.84v4.895H0V4.84C0 3.821.837 3 1.817 3zM4.345 5.382c-.348 0-.662.143-.894.375a1.257 1.257 0 0 0-.892-.375c-.713 0-1.29.6-1.29 1.343 0 .742.578 1.343 1.29 1.343.346 0 .66-.144.892-.376.232.232.546.376.894.376.712 0 1.29-.6 1.29-1.343 0-.742-.578-1.343-1.29-1.343z"
            />
          </svg>
          <span class="font-weight-bold text-color-default padding-x-xxs">{{ resultCount }}</span>
          <slot name="cards-found" />
        </div>
      </div>
      <hr class="border-contrast-low margin-y-md display@md">
      <hr class="border-default margin-y-lg hide@md">
      <div class="row flex-gap-md flex-row@md flex-column align-items-end@md flex-nowrap">
        <slot
          name="filter-select"
          :filters="currentFilters"
        />
        <div class="col@md col-12">
          <a
            href="javascript:void(0)"
            class="btn btn--wide btn--primary justify-content-center padding-x-sm margin-top-0@md margin-top-lg"
            @click.prevent="openFilter = false; handleMultipleFilter()"
          >
            <slot name="apply-filter" />
          </a>
        </div>
      </div>
    </div>
    <div class="margin-bottom-lg hide@md text-center">
      <a
        href="javascript:void(0)"
        class="btn btn--wide btn--outline padding-x-md font-weight-bold justify-content-between"
        @click.prevent="openFilter = true"
      >
        <slot name="open-filter" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="#FF3465"
            fill-rule="nonzero"
            d="M15.288 0H.728a.686.686 0 0 0-.61.364.668.668 0 0 0 .054.707l5.334 7.362.006.007c.193.257.298.567.299.886v6.002a.661.661 0 0 0 .198.475.689.689 0 0 0 .752.144l2.997-1.12a.637.637 0 0 0 .447-.627V9.326c0-.319.105-.63.299-.886l.005-.007 5.335-7.362a.667.667 0 0 0 .054-.707.685.685 0 0 0-.61-.364z"
          />
        </svg>

      </a>
      <div class="d-inline-flex align-items-center border border-contrast-low rounded-sm padding-xxxs margin-top-sm text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="#787878"
            fill-rule="evenodd"
            d="M16 11.04v.109c0 1.02-.772 1.851-1.752 1.851H1.817C.837 13 0 12.168 0 11.149v-.109h16zM14.248 3C15.228 3 16 3.821 16 4.84v4.895H0V4.84C0 3.821.837 3 1.817 3zM4.345 5.382c-.348 0-.662.143-.894.375a1.257 1.257 0 0 0-.892-.375c-.713 0-1.29.6-1.29 1.343 0 .742.578 1.343 1.29 1.343.346 0 .66-.144.892-.376.232.232.546.376.894.376.712 0 1.29-.6 1.29-1.343 0-.742-.578-1.343-1.29-1.343z"
          />
        </svg>
        <span class="font-weight-bold text-color-default padding-x-xxs">{{ resultCount }}</span>
        <slot name="cards-found" />
      </div>
    </div>
    <div 
      class="filtered__list position-relative"
    >
      <!-- <ul
        ref="renderList"
        class="row flex-gap-md"
        v-infinite-scroll=""
        infinite-scroll-disabled="disabled"
      > -->

      <ul
        ref="renderList"
        class="row flex-gap-md"
      >
        <li 
          v-for="(item, index) in listContent"
          :key="index"
          class="col-12"
        >
          <slot
            name="card-box"
            :data="item"
          />
        </li>
      </ul>
    </div>

    <el-pagination 
      v-if="hasPagination"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="filtered.length"
      :pager-count="5"
      layout="prev, pager, next"
      class="padding-0 margin-top-xl d-flex justify-content-between"
    />

    <!-- v-if="loading" -->
    <p
      v-loading="loading"
      :class="['text-center', {'padding-y-lg': !noMore}]"
      v-html="'&nbsp;'"
    />
  </div>
</template>

<script>
  import handleFilter from "@/mixins/handleFilter";
  import isMobile from "@/mixins/isMobile";
  import pagination from "@/mixins/pagination";

  // import CardBox from "./CardBox.vue";

  export default {
    name: "CardsFilter",
    mixins: [handleFilter, isMobile, pagination],
    // components: {CardBox},
    data() {
      return {
        loading: false,
        openFilter: false,
        numberLoadItems: 2,
      }
    },
    props: {
      hasPagination: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      noMore() {
        return this.count >= this.filtered.length;
      },
      disabled() {
        return this.loading || this.noMore;
      },
      offset() {
        return this.filtered.length - this.count >= this.numberLoadItems ? this.numberLoadItems : this.filtered.length - this.count;
      },
      listContent() {
        return this.filtered.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize) 
      }
    },
    mounted () {
      // this.$refs.renderList.style.height = `${this.$refs.renderList.offsetHeight}px`;
      // console.log(this.$refs.renderList.style);
      // window.addEventListener('scroll', this.$utils.throttle(() => {
      //   const scroll = window.scrollY || window.pageYOffset;
      //   const triggerPoint = this.$refs.renderList.getBoundingClientRect().top + scroll + Math.abs(this.$refs.renderList.clientHeight - window.innerHeight / 1.125)

      //   if (triggerPoint < scroll && !this.disabled) this.load();
      // }))
    },
    methods: {
      // load() {
      //   this.loading = true
      //   setTimeout(() => {
      //     this.count += this.offset;
      //     this.loading = false
      //   }, 2000)
      // }
    },
  }
</script>

<style lang="scss" scoped>
</style>