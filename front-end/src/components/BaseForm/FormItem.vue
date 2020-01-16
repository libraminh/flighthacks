<template>
  <fragment>
    <el-select 
      v-if="item.type == 'select'"
      v-model="formValue[item.value]"
      :placeholder="item.label"
      class="width-100%"
    >
      <el-option 
        v-for="opt in item.options" 
        :key="opt.value"
        :label="opt.label" 
        :value="opt.value"
      ></el-option>
    </el-select>

    <el-date-picker
      v-else-if="item.type == 'date'"
      :type="item.type" :placeholder="item.label" v-model="formValue[item.value]" style="width: 100%;"></el-date-picker>

    <el-time-picker
      v-else-if="item.type == 'time'"
      :placeholder="item.label" v-model="formValue[item.value]" style="width: 100%;"></el-time-picker>

    <el-switch 
      v-else-if="item.type == 'switch'"
      v-model="formValue[item.value]"></el-switch>

    <el-checkbox-group
      v-else-if="item.type == 'checkbox'"
      v-model="formValue[item.value]">
      <el-checkbox 
        v-for="checkOpt in item.options"
        :key="checkOpt.name"
        :class="{'d-block' : item.layout == 'column'}"
        :label="checkOpt.label" :name="checkOpt.name"></el-checkbox>
    </el-checkbox-group>

    <el-radio-group 
      v-else-if="item.type == 'radio'"
      v-model="formValue[item.value]">
      <el-radio 
        v-for="radioItem in item.options"
        :key="radioItem.label"
        :class="['margin-bottom-sm', {'d-block' : item.layout == 'column'}]"
        :label="radioItem.label">
      </el-radio>
    </el-radio-group>

    <el-input
      v-else-if="item.type == 'textarea'"
      :placeholder="labelStyle == 'placeholder' ? item.label : ''"
      :type="item.type" v-model="formValue[item.value]"></el-input>

    <!-- <el-input 
      v-else-if="item.type == 'number'"
      v-model.number="formValue[item.value]"
      :placeholder="labelStyle == 'placeholder' ? item.label : ''"
      :type="item.type"
    >
    </el-input> -->

    <el-input 
      v-else-if="item.type == 'other_number'"
      v-model="formValue[item.value]"
      :placeholder="labelStyle == 'placeholder' ? item.label : ''"
      type="number"
    >
    </el-input>

    <el-input 
      v-else-if="item.type == 'age'"
      v-model.number="formValue[item.value]"
      :placeholder="labelStyle == 'placeholder' ? item.label : ''"
      type="number"
    >
    </el-input>

    <el-input 
      v-else
      v-model="formValue[item.value]"
      :placeholder="labelStyle == 'placeholder' ? item.label : ''"
      :type="item.type"
    >
    </el-input>
  </fragment>
</template>

<script>
  export default {
    name: 'FormItem',
    props: {
      item: {
        type: Object,
        default: () => {},
        required: true
      },
    },
    inject: ['formProps'],
    data() {
      const { formValue, labelStyle } = this.formProps;
      return {
        formValue,
        labelStyle,
      }
    },
    mounted () {
      // prevent change number value when scrolling
      document.querySelectorAll('input[type=number]').forEach(item => item.addEventListener('mousewheel', (e) => e.preventDefault()));
    },
  }
</script>

<style lang="scss" scoped>

</style>