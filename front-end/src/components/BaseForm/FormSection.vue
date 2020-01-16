<template>
  <div class="form-section margin-bottom-lg">
    <h4 v-if="sectionItem.title" class="font-weight-bold text-lg margin-bottom-sm" v-html="sectionItem.title"></h4>

    <form-steps
      v-for="(step, index) in sectionItem.stepItems"
      :key="index"
      :step-item="step"
    />
  </div>
</template>

<script>
  import FormSteps from './FormSteps';
  export default {
    name: 'FormSection',
    components: {
      FormSteps,
    },
    props: {
      sectionItem: {
        type: Object,
        default: () => {},
        required: true
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>