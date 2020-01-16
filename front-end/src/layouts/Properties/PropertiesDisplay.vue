<template>
  <div
    ref="wrapper"
    class="properties-listing__display"
  >
    <properties-filter 
      class="properties-listing__filter margin-bottom-xxl@lg margin-bottom-xl"
      :items="filterList"
      :sort-options="sortOptions"
      @change-filter="handleChangeFilter"
    />

    <div 
      v-loading="loading" 
      class="properties-listing__list"
    >
      <div class="grid grid-gap-md">
        <div 
          v-for="(item, index) in filtered.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)"
          :key="index"
          class="col-4@lg col-6@md"
        >
          <property-item :data="item" />
        </div>
      </div>

      <el-pagination 
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :total="filtered.length"
        :pager-count="5"
        layout="prev, pager, next"
        class="padding-0 margin-top-xl d-flex justify-content-between"
      />
    </div>
  </div>
</template>

<script>
  import PropertiesFilter from "./PropertiesFilter.vue";
  import PropertyItem from "./PropertyItem.vue";
  import handleFilter from "@/mixins/handleFilter";
  import pagination from "@/mixins/pagination";

  export default {
    name: "PropertiesDisplay",
    mixins: [handleFilter, pagination],
    components: {
      PropertiesFilter,
      PropertyItem
    },
    props: {
      sortOptions: {
        type: Object,
        default: () => {}
      },
    },
    computed: {
      itemsTagList() {
        let arr = [];
        this.itemsList.forEach(item => {
          let str = '';
          item['investment-type'].forEach((el, index) => {
            let tmp = this.filterList.find(e => e.slug === 'investment-type').options.find(e => e.value === el);
            str += `${tmp.label}${index < item['investment-type'].length - 1 ? ', ' : ''}`;
          })

          item['property-type'].forEach((el, index) => {
            let tmp = this.filterList.find(e => e.slug === 'property-type').options.find(e => e.value === el);
            str += `${tmp.label}${index < item['property-type'].length - 1 ? ', ' : ''}`;
          })
          arr.push(str);
        })
        return arr;
      }
    },
    methods: {
      handleChangeFilter(filters, sortOption) {
        this.currentFilters = filters;
        this.handleMultipleFilter().then(() => {
          this.handleSort(sortOption.type, sortOption.sortBy, sortOption.sortOrder);
        });
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>