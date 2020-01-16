<template>
  <div>
    <p v-if="stepItem.subtitle" class="font-weight-bold text-sm text-color-primary margin-bottom-xs" v-html="stepItem.subtitle"></p>

    <form-items
      :fields="stepItem.fields"
    />
  </div>
</template>

<script>
  import FormItems from './FormItems'
  export default {
    name: 'FormSteps',
    components: {
      FormItems,
    },
    props: {
      stepItem: {
        type: Object,
        default: () => {},
        required: true
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>