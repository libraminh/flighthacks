<template>
  <el-form 
    :model="formValue" 
    :rules="rules"
    :label-position="labelStyle == 'floating' ? labelPosition : ''"
    :ref="formRef" 
    :label-width="labelStyle == 'floating' ? '120px' : ''" 
    :id="`${formRef}`"
    :class="[`demo-formValue`]"
  >
    <template v-if="!isSuccess">
      <form-items />

      <el-form-item>
        <slot name="btn-submit" :submit-form="submitForm" />
        <slot name="btn-clear" :reset-form="resetForm" />
      </el-form-item>
    </template>

    <slot v-else name="thank-you" />
  </el-form>
</template>

<script>
  // Must pre-install this plugin 
  // https://github.com/LinusBorg/vue-reactive-provide

  import FormItems from './FormItems';

  export default {
    name: 'FormDefault',
    components: {
      FormItems,
    },
    props: {
      formItems: {
        type: Array,
        default: () => [],
        required: true
      },
      formAction: {
        type: String,
        default: '',
        required: true
      },
      formToken: {
        type: String,
        default: '',
        required: true
      },
      labelPosition: {
        type: String,
        default: 'left' // top/left/right
      },
      labelStyle: {
        type: String,
        default: 'placeholder',
      }
    },
    // custom reactive provide/inject
    reactiveProvide: {
      name: 'formProps',
      include: ['labelStyle', 'formItems', 'formValue'],
    },
    data() {
      return {
        // formValue: {
          
        // },
        formRef: `form_default_${_uid}`,
        isSuccess: false,
      }
    },
    created () {
      // this.initFormValue();
    },
    computed: {
      rules() {
        return this.formItems.reduce((acc, current) => ({
          ...acc,
          [current.value] : current.validation
        }), {})
      },
      formValue() {
        return this.formItems.reduce((acc, current) => {
          switch (current.type) {
            case 'checkbox':
              acc = { ...acc, [current.value] : [] };
              break;
            case 'number':
              console.log('hehe');
              acc = { ...acc, [current.value] : parseFloat(null) };
              break;
            default:
              acc = { ...acc, [current.value] : null };
              break;
          }
          return acc;
        }, {});
      }
    },
    methods: {
      initFormValue() {
        this.formValue = this.formItems.reduce((acc, current) => {
          switch (current.type) {
            case 'checkbox':
              acc = { ...acc, [current.value] : [] };
              break;
            case 'number':
              console.log('hehe');
              acc = { ...acc, [current.value] : parseFloat(null) };
              break;
            default:
              acc = { ...acc, [current.value] : null };
              break;
          }
          return acc;
        }, {});
      },
      submitForm() {
        const self = this;

        this.$refs[this.formRef].validate(async (valid) => {
          if (!valid) return;
          try {
            const response = await self.$http.post(self.formAction, self.formValue);
            if (!response) return;
            if (response.data.status === '1') {
              self.isSuccess = true;
              self.$emit('submit-success');
            } else self.$message.error(response.data);
          } catch (error) {
            self.$message.error(error);
          }
        });
      },
      resetForm() {
        this.$refs[this.formRef].resetFields();
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>