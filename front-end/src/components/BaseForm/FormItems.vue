<template>
  <div class="grid grid-gap-x-md">
    <el-form-item 
      v-for="(item, index) in fields"
      :key="index"
      :label="labelStyle == 'floating' ? item.label : ''" 
      :prop="item.value"
      :class="[`${item.fieldClass || 'col-12'}`]"
    >
      <form-item :item="item" />
    </el-form-item>
  </div>
</template>

<script>
  import FormItem from './FormItem';
  export default {
    name: 'FormItems',
    components: {
      FormItem,
    },
    props: {
      fields: {
        type: Array,
        default: () => [],
        required: true
      },
    },
    inject: ['formProps'],
    data() {
      const { labelStyle } = this.formProps;
      return {
        labelStyle,
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>