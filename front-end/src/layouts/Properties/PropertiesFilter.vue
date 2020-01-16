<template>
  <div 
    class="filter-bar padding-md@lg rounded-lg" 
    data-theme="gray"
  >
    <div class="grid grid-gap-md align-items-end">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="col@lg col-12"
      >
        <div class="filter-item padding-0@lg padding-x-md padding-y-default rounded-lg">
          <p class="font-weight-bold text-xs text-uppercase text-dim">
            {{ item.label }}
          </p>
          <el-select 
            v-model="currentFilters[item.slug]" 
            placeholder="Select" 
            default-first-option
            @change="handleChange"
          >
            <!-- <slot name="option-all" /> -->
            <el-option
              v-for="(opt, i) in item.options"
              :key="i"
              :label="opt.label"
              :value="opt.value"
              class="padding-y-xxs"
            >
              <span v-html="opt.label" />
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="col@lg col-12">
        <div class="filter-item padding-0@lg padding-md rounded-lg">
          <p class="font-weight-bold text-xs text-uppercase text-dim">
            {{ sortOptions.label }}
          </p>
          <el-select 
            v-model="sortOrder" 
            placeholder="Select" 
            default-first-option
            @change="handleChange"
          >
            <el-option
              v-for="(opt, i) in sortOptions.options"
              :key="i"
              :label="opt.label"
              :value="opt.value"
              class="padding-y-xxs"
            >
              <span v-html="opt.label" />
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import handleFilter from "../../mixins/handleFilter";

  export default {
    name: "PropertiesFilter",
    props: {
      items: {
        type: Array,
        default: () => []
      },
      sortOptions: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        currentFilters: {
          'investment-type': 'all',
          'property-type': 'all',
          'funding-status': 'all'
        },
        sortBy: this.sortOptions.slug,
        sortOrder: 'asc'
      }
    },
    mounted () {
      // set default value to all
      // this.items.forEach(e => {
      //   this.currentFilters[e.slug] = e.options[0].value;
      // });
      this.handleChange();
    },
    methods: {
      handleChange() {
        const { currentFilters, sortBy, sortOrder } = this;
        this.$emit('change-filter', currentFilters, {type: 'number', sortBy, sortOrder});
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>