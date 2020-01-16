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
			<form-section
				v-for="(item, index) in sectionItems"
				:key="index"
				:section-item="item"
			/>

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

import FormSection from "./FormSection";

export default {
	components: {
		FormSection
	},
	props: {
		sectionItems: {
			type: Array,
			default: () => [],
			required: true
		},
		formAction: {
			type: String,
			default: "",
			required: true
		},
		formToken: {
			type: String,
			default: "",
			required: true
		},
		labelPosition: {
			type: String,
			default: "left" // top/left/right
		},
		labelStyle: {
			type: String,
			default: "placeholder"
		}
	},
	// custom reactive provide/inject
	reactiveProvide: {
		name: "formProps",
		include: ["labelStyle", "formValue"]
  },
 
	data() {
		return {
			checkAge: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the age'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
          if (value < parseFloat(rule.minAge)) {
            callback(new Error(`Age must be greater than ${rule.minAge}`));
          } else {
            callback();
          }
        }
      },
      formValue: {},
			formRef: `form_default_${_uid}`,
			isSuccess: false
		};
  },
  created () {
    this.initFormValue();
  },
	computed: {
  
		rules() {
			return this.sectionItems.reduce((acc, current) => {
				current.stepItems.forEach(step => {
					step.fields.forEach(field => {
            switch (field.type) {
              case 'age':
                acc = {
                  ...acc,
                  [field.value]: [ { ...field.validation[0], validator: this.checkAge } ]
                };
                break;

              default:
                acc = {
                  ...acc,
                  [field.value]: field.validation
                };
                break;
            }
					});
				});

				return acc;
			}, {});
		},
    ageValue() {
      return this.formValue.age;
    },
  },
	methods: {
		initFormValue() {
			this.formValue = this.sectionItems.reduce((acc, current) => {
				current.stepItems.forEach(step => {
					step.fields.forEach(field => {
						switch (field.type) {
							case "checkbox":
								acc = { ...acc, [field.value]: [] };
								break;
							default:
								acc = { ...acc, [field.value]: null };
								break;
						}
					});
				});

				return acc;
			}, {});
		},
		submitForm() {
			const self = this;

			this.$refs[this.formRef].validate(async valid => {
				if (!valid) return;
				try {
					const response = await self.$http.post(
						self.formAction,
						self.formValue
					);
					if (!response) return;
					if (response.data.status === "1") {
						self.isSuccess = true;
						self.$emit("submit-success");
					} else self.$message.error(response.data);
				} catch (error) {
					self.$message.error(error);
				}
			});
		},
		resetForm() {
			this.$refs[this.formRef].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped></style>
