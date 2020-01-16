<template>
  <div class="pagination-layout">
    <slot
      name="list-content"
      :data="listContent"
      :current-page="currentPage"
      :page-size="pageSize"
    />

    <el-pagination 
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      :pager-count="5"
      layout="prev, pager, next"
      class="padding-0 margin-top-xl d-flex justify-content-between"
    />
  </div>
</template>

<script>
  import pagination from "@/mixins/pagination";

  export default {
    name: "PaginationLayout",
    mixins: [pagination],
    props: {
      total: {
        type: Number,
        default: undefined,
        required: true
      },
      perPage: {
        type: Number,
        default: undefined,
        required: true
      },
      listItems: {
        type: Array,
        default: () => [],
        required: true
      },
      customClass: {
        type: String,
        default: undefined,
      }
    },
    // data() {
    //   return {
    //     listItems: []
    //   }
    // },
    computed: {
      listContent() {
        return this.listItems.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize) 
      },
      actualPageSize() {
        return Math.floor(this.listItems.length / this.perPage);
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`${val} items per page`);
      },
      async handleCurrentChange(val) {
        console.log(`current page: ${val}`);

        if (val !== this.actualPageSize - 1) return;

        try {
          const { data } = await this.$http.get('https://jsonplaceholder.typicode.com/todos');
          console.log('data', data)

          this.listItems = [...this.listItems, ...data];
        } catch (error) {
          console.log(error)          
        }

      }
    },
  }
</script>

<style lang="scss" scoped>

</style>