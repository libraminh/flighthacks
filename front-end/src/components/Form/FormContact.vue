<template>
  <div 
    v-loading="isSending"
    class="form-wrapper"
  >
    <div
      v-if="formNotification"
      ref="formSubmitNotify"
      class="form-submit-notify to-animate-wrapper text-center"
    >
      <div class="icon-wrapper icon-wrapper--primary rounded-circle margin-bottom-md margin-x-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="#FFF"
            fill-rule="evenodd"
            d="M16 8c0 1.44-.36 2.774-1.08 4A8.084 8.084 0 0 1 12 14.92 7.755 7.755 0 0 1 8 16c-1.44 0-2.774-.36-4-1.08A8.084 8.084 0 0 1 1.08 12 7.755 7.755 0 0 1 0 8c0-1.44.36-2.774 1.08-4A8.084 8.084 0 0 1 4 1.08 7.755 7.755 0 0 1 8 0c1.44 0 2.774.36 4 1.08A8.084 8.084 0 0 1 14.92 4 7.755 7.755 0 0 1 16 8zm-8.935 4.226L13 6.29a.43.43 0 0 0 .161-.355.43.43 0 0 0-.161-.354l-.71-.742a.51.51 0 0 0-.742 0L6.71 9.677 4.452 7.42a.51.51 0 0 0-.742 0L3 8.161a.43.43 0 0 0-.161.355c0 .15.053.269.161.355l3.355 3.355a.43.43 0 0 0 .355.161.43.43 0 0 0 .355-.161z"
          />
        </svg>
      </div>
      <div 
        v-if="formNotification.title !== ''" 
        class="heading-wrapper to-animate-wrapper"
      >
        <h3 class="margin-bottom-md">
          {{ formNotification.title }}
        </h3>

        <p
          v-if="formNotification.message !== ''"
          class=""
        >
          {{ formNotification.message }}
        </p>
      </div>
    </div>
    <el-form
      id="form-contact"
      ref="form"
      :model="formContact"
      :rules="ruleValidate"
      :class="{'form--label-floating': labelStyle === 'floating'}"
    >
      <el-form-item 
        v-for="(item, index) in formItems" 
        :key="index" 
        :prop="item.value"
        :label="item.label && labelStyle === 'floating' ? item.label : ''"
        :class="{'has-content': formContact[item.value] || item.type === 'select'}"
      >

        <template v-if="item.type === 'submit'">
          <slot name="btn-submit" :on-submit="onSubmit" />
        </template>

        <el-input 
          v-else-if="item.type === 'textarea'"
          v-model="formContact[item.value]" 
          :id="`contact-${item.value}`"
          :autosize="{minRows: 5, maxRows: 10}"
          :type="item.type"
          :placeholder="labelStyle === 'placeholder' ? item.label : ''"
          @focus="handleInputFocus($event, true)"
          @blur="handleInputFocus($event, false)"
        />
        <!-- @on-keypress="item.value === 'phone' ? checkDigit($event) : false" -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formContact[item.value]"
          :id="`contact-${item.value}`"
          :placeholder="labelStyle === 'placeholder' ? item.label : ''"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-input 
          v-else
          v-model="formContact[item.value]" 
          :id="`contact-${item.value}`"
          :type="item.type"
          :placeholder="labelStyle === 'placeholder' ? item.label : ''"
          @focus="handleInputFocus($event, true)"
          @blur="handleInputFocus($event, false)"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "FormContact",
    props: {
      formAction: {
        type: String,
        default: '',
        required: true
      },
      formItems: {
        type: Array,
        default: () => [],
        required: true
      },
      formToken: {
        type: String,
        default: '',
        required: true
      },
      labelStyle: {
        type: String,
        default: 'placeholder',
        validation: (value) => ['placeholder', 'floating'].indexOf(value) !== -1
      },
      formNotification: {
        type: Object,
        default: () => {},
      }
    },
    data() {
      return {
        formContact: {
          token: this.formToken,
          // lang: this.formLabel.lang
        },
        isSending: false
      }
    },
    computed: {
      ruleValidate() {
        let validateRules = {}
        this.formItems.forEach(item => {
          if (item.value !== 'submit')
            validateRules[item.value] = item.validation;
        });
        return validateRules;
      }
    },
    methods: {
      checkDigit(event) {
        let key = event.which || event.keyCode;
        // Allow: backspace, delete, tab, escape, enter and .
        let exceptions = [8, 9, 27, 13, 40, 41, 43];
        if (exceptions.indexOf(key) !== -1 ||
          // Allow: Ctrl+A, Command+A
          (key === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
          // Allow: home, end, left, right, down, up
          (key >= 35 && key <= 40)) {
            // let it happen, don't do anything
            return;
        } else if (key < 48 || key > 57) {
          event.preventDefault();
        }
      },
      handleInputFocus(event, status) {
        let formItem = event.target.parentElement.parentElement.parentElement;
        formItem.classList.toggle('focused', status);
      },
      onSubmit() {
        const self = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
            self.isSending = true;
            self.$http
              .post(self.formAction, self.formContact)
              .then(response => {
                self.isSending = false;
                if (response.data.status === '1') {
                  self.$emit('submit-success');
                  self.$refs.formSubmitNotify.classList.add('shown');
                  self.$refs.form.style.opacity = 0;
                  setTimeout(() => {
                    self.$refs.formSubmitNotify.classList.add('visible');
                  }, 100)
                } else self.$message.error(response.data);
              })
              .catch(error => {
                // console.log(error);
                self.isSending = false;
                self.$message.error(error);
              });
          }
        });
      },
    }
  }
</script>

<style lang="scss">
.form-wrapper {
  position: relative;

  .form-submit-notify {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    // text-align: center;
    // border-radius: 16px;
    // background-color: #fff;
    opacity: 0;
    z-index: 1;
    transition: all 0.4s;

    &.shown {
      display: flex;
      opacity: 1;

      ~ form {
        opacity: 0;
      }
    }

    &.visible {
      opacity: 1;
    }
  }
}

.form--label-floating {
  .el-form-item {
    position: relative;
    margin-bottom: 2.5rem;

    .el-form-item__label {
      position: absolute;
      top: 0;
      left: 0;
      font-weight: normal;
      // z-index: 1;
      transition: all 0.3s;
    }

    &.focused .el-form-item__label,
    &.has-content .el-form-item__label {
      color: var(--color-primary);
      // font-weight: 500;
      transform: translateY(-60%);
    }
  }

  .el-input {
    width: 100% !important;
  }

  .el-input__inner,
  .el-textarea__inner {
    padding-left: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
    background-color: transparent;
  }

  .el-input--prefix {
    .el-input__prefix {
      left: 0;
    }

    .el-input__inner {
      padding-left: 30px !important;
    }
  }
}
</style>